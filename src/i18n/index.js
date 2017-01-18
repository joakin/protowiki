import langs from './langs'

const PARAM = '#'
// Transform strings with # markers to functions
const labels = Object.keys(langs).reduce((ls, lang) => {
  ls[lang] = Object.keys(langs[lang]).reduce((kvs, key) => {
    const msg = langs[lang][key].indexOf(PARAM) === -1 ?
      langs[lang][key] :
      (params) => {
        return langs[lang][key].split(PARAM)
          .map((str, i) => str + (i < params.length ? params[i] : ''))
          .join('')
      }
    kvs[key] = msg
    return kvs
  }, {})
  return ls
}, {})

const defaultLanguage = 'hi'
let currentLanguage = defaultLanguage

export default function label (key, params) {
  const msg = (labels[currentLanguage] || labels[defaultLanguage])[key]
  if (typeof msg === 'function') {
    return msg.call(null, params)
  } else if (typeof msg === 'string') {
    return msg
  } else if (!msg) {
    return `<${key}>`
  } else {
    return 'UNKNOWN'
  }
}

export function setCurrentLanguage (newLanguage) {
  currentLanguage = newLanguage
}
