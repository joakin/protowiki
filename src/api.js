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
