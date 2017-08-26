import React from 'react'
import { withRouter } from 'react-router'

let origin = window.location.origin

export default withRouter(React.createClass({

  propTypes: {
    match: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired,
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.element
    ])
  },

  render () {
    return (
      <div className='CaptureClicks' onClick={this.click}>
        {this.props.children}
      </div>
    )
  },

  click (e) {
    if (e.target.href) {
      let originIndex = e.target.href.indexOf(origin)
      if (originIndex === 0) {
        e.preventDefault()
        const { history } = this.props
        history.push(e.target.href.slice(origin.length))
      }
    }
  }
}))
