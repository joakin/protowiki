import React from 'react'
import ReactDOM from 'react-dom'
import Icon, {types} from '../icon'
import flags from '../../flags'

import './action-bar.css'

export default React.createClass({

  getInitialState () {
    return { saved: false }
  },

  onSaveClick () {
    let saveButton
    let bounds
    let animatedSaveButton
    const rotationDuration = 750
    const animationDuration = 750

    const menuItemTo = document.querySelector('.Menu-list .Icon.is-type-savedpages')
    const toBounds = menuItemTo.getBoundingClientRect()
    console.log(toBounds)

    const buttonAnimation = new Promise((resolve, reject) => {
      this.setState({ saved: true })
      return resolve(animationFrame())
    })
    .then(() => {
      saveButton = ReactDOM.findDOMNode(this).querySelector('.ActionBar-save')
      bounds = saveButton.getBoundingClientRect()
      animatedSaveButton = saveButton.cloneNode(true)
      animatedSaveButton.className += ' flying'

      saveButton.style.transition =
        `transform ${rotationDuration / 1000}s ease-out`
      saveButton.style.transform = 'rotateY(0deg)'

      return animationFrame(() => {
        saveButton.style.transform = 'rotateY(180deg)'
      }).then(() => wait(rotationDuration))
      .then(() => { saveButton.style.transform = 'rotateY(0deg)' })
    })

    const flyingAnimation = buttonAnimation.then(() => {
      animatedSaveButton.style.transition =
        `opacity ${animationDuration / 1000}s ease-out,` +
        `transform ${animationDuration / 1000}s ease-in-out`
      animatedSaveButton.style.transform =
        `translateX(${bounds.left}px) translateY(${bounds.top}px) rotate(0deg)`

      document.body.appendChild(animatedSaveButton)

      return animationFrame(() => {
        animatedSaveButton.style.transform =
          `translateX(${toBounds.width / 3}px) translateY(${toBounds.top + (toBounds.height / 2)}px) rotate(-359deg)`
        animatedSaveButton.style.opacity = 0.7
      }).then(() => wait(animationDuration))
    })
    .then(() => {
      animatedSaveButton.remove()
    })
    .catch((e) => console.error(e))

    return [buttonAnimation, flyingAnimation]
  },

  render () {
    const {onDownload, onSave} = this.props
    const {saved} = this.state
    return (
      <div className='ActionBar'>
        <Icon type={types.LANGUAGE} />
        {flags.SAVE_PAGE
          ? <Icon type={saved ? types.UNSAVE : types.SAVE}
            className='ActionBar-save'
            onClick={() => {
              saved
                ? this.setState({ saved: false })
                : onSave(this.onSaveClick())
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

function wait (ms) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms))
}

function animationFrame (fn) {
  return new Promise((resolve, reject) =>
    window.requestAnimationFrame(() => {
      if (fn) fn()
      resolve()
    }))
}
