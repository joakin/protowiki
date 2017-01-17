import React from 'react'

import Icon, {types} from '../icon'

import './section.css'

export default React.createClass({
  getInitialState () {
    return {
      open: true
    }
  },

  render () {
    const {title, html} = this.props
    const {open} = this.state
    return (
      <div className={`Section ${open ? 'is-open' : ''}`}>
        {title
          ? <h2 className='Section-title' onClick={(e) => this.setState({ open: !open })}>
            <Icon type={types.ARROW}
              className={`Section-collapse ${open ? 'up' : ''}`} />
            <span dangerouslySetInnerHTML={{__html: title}} />
          </h2> : null}
        <div className='Section-body' dangerouslySetInnerHTML={{__html: html}} />
      </div>
    )
  }
})
