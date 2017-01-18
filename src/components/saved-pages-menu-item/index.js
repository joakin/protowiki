import React from 'react'
import { connect } from 'react-redux'
import Actions from '../../actions'
import msg from '../../i18n'

import './saved-pages-menu-item.css'

const SavedPagesMenuItem = React.createClass({

  componentDidMount () { this.props.updateTotal() },

  render () {
    const {total, highlightSavedPages} = this.props
    return (
      <span className={`SavedPagesMenuItem ${highlightSavedPages ? 'is-highlighted' : ''}`}>
        <span>{msg('saved_pages')}</span>
        <span className='SavedPagesMenuItem-total'>{total}</span>
      </span>
    )
  }
})

export default connect(
  ({savedPages, toggles}) => ({
    total: savedPages.pages.isSuccess()
      ? savedPages.pages.unwrap().length
      : savedPages.pages.withDefault('-'),
    highlightSavedPages: toggles.highlightSavedPages
  }),
  (dispatch) => ({
    updateTotal: () => dispatch(Actions.getSavedPages())
  })
)(SavedPagesMenuItem)
