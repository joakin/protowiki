import {combineReducers} from 'redux'

import menu from './menu'
import online from './online'
import currentArticle from './current-article'

export default combineReducers({
  menu,
  online,
  currentArticle
})
