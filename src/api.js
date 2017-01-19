import {getCurrentLanguage} from './i18n'

const HOST = 'wikipedia.org'

const restOptions = {
  mode: 'cors'
}

const rest = (lang, host, endpoint) =>
  `https://${lang}.${host}/api/rest_v1${endpoint}`

const endpoints = {
  article: (title) => `/page/mobile-sections/${title}`
}

export function article (title) {
  return window.fetch(rest(getCurrentLanguage(), HOST, endpoints.article(title)), restOptions)
    .then((resp) => resp.json())
}

// Printing

const printOrigin = window.location.host.indexOf('localhost') === 0
  ? 'http://autowiki.surge.sh' : window.location.origin

const printService =
  'https://pdf-service-proxy-dtauxfgiyk.now.sh' // proxy on server/pdf-service-proxy
  // 'https://pdf-electron.wmflabs.org' // gwicke's service

export function printFlashcardUrl ({title}) {
  return `${printService}/jpeg?` +
    `accessKey=secret&delay=5&quality=100&` +
    `url=${encodeURIComponent(`${printOrigin}/flashcard/${title}`)}&` +
    // Keep browser width and height in sync with flashcard.css style sizes
    `&browserWidth=375&browserHeight=670`
}

export function printUrl ({title, pageSize = 'Legal', marginsType = 0}) {
  return `${printService}/pdf?` +
    `accessKey=secret&delay=5&` +
    `url=${encodeURIComponent(`${printOrigin}/print/${title}`)}&` +
    `pageSize=${pageSize}&marginsType=${marginsType}`
}
