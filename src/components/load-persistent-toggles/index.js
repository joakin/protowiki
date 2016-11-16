import React from 'react'
import { connect } from 'react-redux'
import Actions from '../../actions'

const LoadPersistentToggles = React.createClass({

  componentWillMount () { this.props.loadPersistentToggles() },

  render () { return null }

})

export default connect(
  null,
  (dispatch) => ({
    loadPersistentToggles: () => dispatch(Actions.loadPersistentToggles())
  })
)(LoadPersistentToggles)

