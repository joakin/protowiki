import React from 'react';
import flags from '../../flags'

export default React.createClass({

  getInitialState () {
    this.supported = flags.ONLINE_STATUS_BAR && 'onLine' in window.navigator
    // Always report online if not supported
    return { online: this.supported ?  window.navigator.onLine : true }
  },

  offline () { this.setState({ online: false }) },

  online () { this.setState({ online: true }) },

  componentWillMount () {
    if (this.supported) {
      window.addEventListener("offline", this.offline)
      window.addEventListener("online", this.online)
    }
  },

  componentWillUnmount () {
    if (this.supported) {
      window.removeEventListener("offline", this.offline)
      window.removeEventListener("online", this.online)
    }
  },

  render () {
    return this.props.children(this.state);
  }

})

