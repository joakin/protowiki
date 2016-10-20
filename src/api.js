const HOST = 'en.wikipedia.org'

const restOptions = {
  mode: 'cors',
  headers: {}
}

const isSafari = navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') === -1
const corsProxy = 'https://cors-proxy-mhwanfbyyu.now.sh/'

const rest = (host, endpoint) =>
  `${isSafari ? corsProxy : ''}https://${host}/api/rest_v1${endpoint}`

const endpoints = {
  article: (title) => `/page/mobile-sections/${title}?redirect=true`
}

export function article (title) {
  return window.fetch(rest(HOST, endpoints.article(title)), restOptions)
    .then((resp) => resp.json())
}

// Printing

function getPrintingServiceUrl (type, delay, url, pageSize = 'A5', marginsType = 0) {
  return `https://pdf-electron.wmflabs.org/${type}?` +
      `accessKey=secret&delay=${delay}&` +
      `url=${encodeURIComponent(url)}&` +
      `pageSize=${pageSize}&marginsType=${marginsType}`
}

const printOrigin = window.location.host.indexOf('localhost') === 0
  ? 'http://autowiki.surge.sh' : window.location.origin

export function printFlashcardUrl ({title}) {
  return getPrintingServiceUrl('pdf', 10, `${printOrigin}/flashcard/${title}`, 'A5', 0)
}

export function printUrl ({title, pageSize = 'A5', marginsType = 0}) {
  return getPrintingServiceUrl('pdf', 10, `${printOrigin}/wiki/${title}`, pageSize, marginsType)
}
