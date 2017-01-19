import React from 'react'
import { connect } from 'react-redux'
import Actions from '../../actions'
import Icon, {types} from '../icon'
import SavedAgo from '../saved-ago'
import msg, {getCurrentLanguage} from '../../i18n'

import './saved-page-status-bar.css'

function SavedPageStatusBar ({article, savedPage, updateArticle}) {
  if (!savedPage) {
    return null
  }
  return (
    <div className='SavedPageStatusBar'>
      <SavedAgo date={savedPage.lastSave} />
      <div>
        <a onClick={() => updateArticle(article.title)}><Icon type={types.REFRESH} />
          {msg('update_now')}
        </a>
      </div>
    </div>
  )
}

const stateToProps = ({ currentArticle, savedPages }) => ({
  article: currentArticle,
  savedPage: savedPages.pages
    .withDefault([])
    .filter((p) => p.key === getCurrentLanguage() + '-' + currentArticle.title)[0] ||
      undefined
})

const dispatchToProps = (dispatch) => ({
  updateArticle: (title) => dispatch(Actions.updateArticle(title))
})

export default connect(stateToProps, dispatchToProps)(SavedPageStatusBar)
