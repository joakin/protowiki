const http = require('http')
const url = require('url')
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
      rewriteHeaders(targetRes, res, target + req.url)
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

function rewriteHeaders (targetRes, res, uri) {
  const fileName = fileNameFromUrl(uri)
  const contentDisposition = 'attachment; filename="' + fileName + '"'
  targetRes.headers['Content-Disposition'] = contentDisposition
  res.oldWriteHead = res.writeHead
  res.writeHead = function (statusCode, headers) {
    res.setHeader('Content-Disposition', contentDisposition)
    if (headers) headers['Content-Disposition'] = contentDisposition

    res.oldWriteHead(statusCode, headers)
  }
}

function fileNameFromUrl (uri) {
  const u = url.parse(uri, true)

  let extension = u.pathname.slice(1)
  if (extension !== 'jpeg' && extension !== 'pdf') {
    throw new Error('Unknown extension from path ' + u.pathname)
  }

  let title = 'Wikipedia'
  const up = url.parse(u.query.url, true).pathname.split('/')
  if (up.length === 3) title += ' - ' + up[up.length - 1]

  return title + '.' + extension
}
