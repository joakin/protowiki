const HOST = 'en.wikipedia.org'

const restOptions = {
  mode: 'cors',
  headers: {}
}

const rest = (host, endpoint) =>
  `https://${host}/api/rest_v1${endpoint}`

const endpoints = {
  article: (title) => `/page/mobile-sections/${title}?redirect=true`
}

export function article (title) {
  return window.fetch(rest(HOST, endpoints.article(title)), restOptions)
    .then((resp) => resp.json())
}
