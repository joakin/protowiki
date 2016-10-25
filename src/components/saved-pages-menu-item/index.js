import React from 'react'
import { connect } from 'react-redux'
import Actions from '../../actions'

import './saved-pages-menu-item.css'

const SavedPagesMenuItem = React.createClass({
  componentDidMount () { this.props.updateTotal() },

  render (savedPages) {
    return (
      <span className='SavedPagesMenuItem'>
        <span>Saved pages</span>
        <span className='SavedPagesMenuItem-total'>{this.props.total}</span>
      </span>
    )
  }
})

export default connect(
  ({savedPages}) => savedPages,
  (dispatch) => ({
    updateTotal: () => dispatch(Actions.getSavedPages())
  })
)(SavedPagesMenuItem)
