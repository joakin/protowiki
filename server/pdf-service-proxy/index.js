const http = require('http')
const concat = require('concat-stream')
const LRU = require('lru-cache')
const cache = LRU({
  max: 50,
  maxAge: 10 /* minutes, to ms: */ * 60 * 1000
})

const target = 'http://pdf-electron.wmflabs.org'

http.createServer((req, res) => {
  const hit = cache.get(req.url)
  if (hit) {
    console.log('CACHED:', req.url)
    return send(hit, res)
  }

  http.get(target + req.url, (targetRes) => {
    console.log('FETCH FROM TARGET:', req.url)
    if (targetRes.statusCode === 200) {
      rewriteHeaders(targetRes, res)
      targetRes.pipe(concat((contents) => {
        cache.set(req.url, {headers: targetRes.headers, contents: contents})
      }))
    }

    targetRes.pipe(res)
  })
}).listen(process.env.PORT || 3001, () => console.log('Server started'))

function send (hit, res) {
  Object.keys(hit.headers).forEach((k) => {
    res.setHeader(k, hit.headers[k])
  })
  return res.end(hit.contents)
}

function rewriteHeaders (targetRes, res) {
  targetRes.headers['Content-Disposition'] = 'attachment'
  res.oldWriteHead = res.writeHead
  res.writeHead = function (statusCode, headers) {
    res.setHeader('Content-Disposition', 'attachment')
    if (headers) headers['Content-Disposition'] = 'attachment'

    res.oldWriteHead(statusCode, headers)
  }
}
