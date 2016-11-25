import React from 'react'
import { connect } from 'react-redux'
import Actions from '../../actions'
import Icon, {types} from '../icon'
import relativeDate from 'relative-date'

import './saved-page-status-bar.css'

function SavedPageStatusBar ({article, savedPage, updateArticle}) {
  return (
    <div className='SavedPageStatusBar'>
      <div>Saved {relativeDate(savedPage.lastSave)}</div>
      <div>
        <a onClick={() => updateArticle(article.title)}><Icon type={types.REFRESH} /> Update now</a>
      </div>
    </div>
  )
}

const stateToProps = ({ currentArticle, savedPages }) => ({
  article: currentArticle,
  savedPage: savedPages.pages
    .withDefault([])
    .filter((p) => p.title === currentArticle.title)[0] ||
      { title: currentArticle.title, lastSave: 0 }
})

const dispatchToProps = (dispatch) => ({
  updateArticle: (title) => dispatch(Actions.updateArticle(title))
})

export default connect(stateToProps, dispatchToProps)(SavedPageStatusBar)
