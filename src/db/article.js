import lf from 'localforage'

export function key (title) { return `article-${title}` }

export function get (title) {
  return lf.getItem(key(title))
}

export function set (title, article) {
  return lf.setItem(key(title), article)
}

export function remove (title) {
  return lf.removeItem(key(title))
}
