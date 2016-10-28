import React from 'react'
import { connect } from 'react-redux'
import Actions from '../../actions'

import './saved-pages-menu-item.css'

const SavedPagesMenuItem = React.createClass({
  componentDidMount () { this.props.updateTotal() },

  render () {
    const {total, highlightSavedPages} = this.props
    return (
      <span className={`SavedPagesMenuItem ${highlightSavedPages ? 'is-highlighted' : ''}`}>
        <span>Saved pages</span>
        <span className='SavedPagesMenuItem-total'>{total}</span>
      </span>
    )
  }
})

export default connect(
  ({savedPages, toggles}) => ({
    total: savedPages.total, highlightSavedPages: toggles.highlightSavedPages
  }),
  (dispatch) => ({
    updateTotal: () => dispatch(Actions.getSavedPages())
  })
)(SavedPagesMenuItem)
