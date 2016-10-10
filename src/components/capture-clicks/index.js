import React from 'react'

let origin = window.location.origin

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.any
  },

  propTypes: {
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
        const { router } = this.context
        router.transitionTo(e.target.href.slice(origin.length))
      }
    }
  }
})
