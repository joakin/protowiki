import lf from 'localforage'

export function key (title) { return `toggles` }

export function get () {
  return lf.getItem(key()).then((ts) => ts || {})
}

export function set (toggles) { return lf.setItem(key(), toggles) }
