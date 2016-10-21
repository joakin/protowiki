import lf from 'localforage'
import * as articleDB from './article'

export function key (title) { return `saved-pages` }

export function get () {
  return lf.getItem(key())
}

export function set (title, article) {
  return get().then((ps) => {
    const pages = ps || []
    const needle = pages.findIndex((page) => page.title === title)
    const savedPage = fromArticle(title, article)
    if (needle > -1) {
      pages[needle] = savedPage
    } else {
      pages.push(savedPage)
    }
    return Promise.all([lf.setItem(key(), pages), articleDB.set(title, article)])
  })
}

export function remove (title) {
  return get().then((ps) => {
    const pages = ps || []
    const needle = pages.findIndex((page) => page.title === title)
    if (needle > -1) {
      pages.splice(needle, 1)
      return Promise.all([
        lf.setItem(key(), pages),
        articleDB.remove(title)
      ])
    }
  })
}

function fromArticle (title, article) {
  return {
    title,
    displaytitle: article.lead.displaytitle,
    description: article.lead.description,
    image: article.lead.image,
    article,
    size: JSON.stringify(article).length,
    lastSave: Date.now()
  }
}
