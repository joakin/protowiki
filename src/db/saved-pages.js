import lf from 'localforage'
import * as articleDB from './article'

import {getCurrentLanguage} from '../i18n'

export function key (title) { return `saved-pages` }

export function get () {
  return lf.getItem(key())
    .then((ps) => ps || [])
}

export function set (title, article) {
  const lang = getCurrentLanguage()
  return get().then((ps) => {
    const pages = ps || []
    const needle = pages.findIndex((page) => page.key === lang + '-' + title)
    const savedPage = fromArticle(lang, title, article)
    if (needle > -1) {
      pages[needle] = savedPage
    } else {
      pages.push(savedPage)
    }
    return Promise.all([lf.setItem(key(), pages), articleDB.set(title, article)])
      .then(() => pages)
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
      ]).then(() => pages)
    }
  })
}

function fromArticle (lang, title, article) {
  return {
    title,
    key: lang + '-' + title,
    displaytitle: article.lead.displaytitle,
    description: article.lead.description,
    image: article.lead.image,
    article,
    size: JSON.stringify(article).length,
    lastSave: Date.now()
  }
}
