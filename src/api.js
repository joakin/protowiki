const HOST = 'en.wikipedia.org'

const restOptions = {
  mode: 'cors'
}

const rest = (host, endpoint) =>
  `https://${host}/api/rest_v1${endpoint}`

const endpoints = {
  article: (title) => `/page/mobile-sections/${title}`
}

export function article (title) {
  return window.fetch(rest(HOST, endpoints.article(title)), restOptions)
    .then((resp) => resp.json())
}

// Printing

const printOrigin = window.location.host.indexOf('localhost') === 0
  ? 'http://autowiki.surge.sh' : window.location.origin

export function printFlashcardUrl ({title}) {
  return `https://pdf-electron.wmflabs.org/jpeg?` +
    `accessKey=secret&delay=5&quality=100&` +
    `url=${encodeURIComponent(`${printOrigin}/flashcard/${title}`)}&` +
    // Keep browser width and height in sync with flashcard.css style sizes
    `&browserWidth=375&browserHeight=670`
}

export function printUrl ({title, pageSize = 'Legal', marginsType = 0}) {
  return `https://pdf-electron.wmflabs.org/pdf?` +
    `accessKey=secret&delay=5&` +
    `url=${encodeURIComponent(`${printOrigin}/print/${title}`)}&` +
    `pageSize=${pageSize}&marginsType=${marginsType}`
}
