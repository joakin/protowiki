import React from 'react'
import { connect } from 'react-redux'
import Actions from '../../actions'
import flags from '../../flags'

const TrackOnlineStatus = React.createClass({

  componentWillMount () {
    this.supported = flags.ONLINE_STATUS_BAR && 'onLine' in window.navigator
    if (this.supported) {
      window.addEventListener('offline', this.props.offline)
      window.addEventListener('online', this.props.online)
    }
  },

  componentWillUnmount () {
    if (this.supported) {
      window.removeEventListener('offline', this.props.offline)
      window.removeEventListener('online', this.props.online)
    }
  },

  render () { return null }

})

export default connect(
  null,
  (dispatch) => ({
    online: () => dispatch(Actions.Online),
    offline: () => dispatch(Actions.Offline)
  })
)(TrackOnlineStatus)

