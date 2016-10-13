import React from 'react'
import ReactDOM from 'react-dom'
import Icon, {types} from '../icon'
import flags from '../../flags'

import './action-bar.css'

export default React.createClass({

  onSaveClick () {
    const saveButton = ReactDOM.findDOMNode(this).querySelector('.ActionBar-save')
    const bounds = saveButton.getBoundingClientRect()

    const animationDuration = 750

    const animatedSaveButton = saveButton.cloneNode(true)
    animatedSaveButton.className += ' flying'

    animatedSaveButton.style.transition =
      `opacity ${animationDuration / 1000}s ease-out,` +
      `transform ${animationDuration/1000}s ease-in-out`
    animatedSaveButton.style.transform =
      `translateX(${bounds.left}px) translateY(${bounds.top}px) rotate(0deg)`
    window.requestAnimationFrame(() => {
      animatedSaveButton.style.transform =
        `translateX(${0}px) translateY(${0}px) rotate(-359deg)`
      animatedSaveButton.style.opacity = 0.3
    })
    setTimeout(() => {
      animatedSaveButton.remove()
    }, animationDuration)
    document.body.appendChild(animatedSaveButton)
  },

  render () {
    const {onDownload, onSave} = this.props
    return (
      <div className='ActionBar'>
        <Icon type={types.LANGUAGE} />
        {flags.SAVE_PAGE
          ? <Icon type={types.DOWNLOAD}
            className='ActionBar-save'
            onClick={() => {
              this.onSaveClick()
              onSave()
            }} />
          : null}
        {flags.DOWNLOAD_IN_ACTION_BAR
          ? <Icon type={types.DOWNLOAD} onClick={onDownload} /> : null}
        <Icon type={types.WATCH} />
        <Icon type={types.EDIT} />
      </div>
    )
  }
})
