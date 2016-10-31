import {combineReducers} from 'redux'

import menu from './menu'
import online from './online'
import currentArticle from './current-article'
import savedPages from './saved-pages'
import toggles from './toggles'
import persistentToggles from './persistent-toggles'

export default combineReducers({
  menu,
  online,
  currentArticle,
  savedPages,
  toggles,
  persistentToggles
})
