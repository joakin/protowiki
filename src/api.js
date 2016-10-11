const HOST = 'en.wikipedia.org'
const fetch = window.fetch

const restHeaders = {
  mode: 'cors',
  headers: {
  }
}

const rest = (host, endpoint) =>
  `https://${host}/api/rest_v1${endpoint}`

const endpoints = {
  article: (title) => `/page/mobile-sections/${title}?redirect=true`
}

export function article (title) {
  return fetch(rest(HOST, endpoints.article(title)), restHeaders)
    .then((resp) => resp.json())
}
