import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Icon, {types} from '../icon'
import flags from '../../flags'
import Actions from '../../actions'
import {printUrl} from '../../api'

import './action-bar.css'

const ActionBar = React.createClass({

  onSaveClick (hasPreviouslySaved) {
    let saveButton
    const {
      highlightSavedPages, openMenu, closeMenu
    } = this.props

    // Wait a tick for the saving to happen and then start animating
    animationFrame(() => {
      saveButton = ReactDOM.findDOMNode(this).querySelector('.ActionBar-save')
      saveButton.className += ' pulse'
    })
    .then(() => wait(
      /* Keep in sync with the CSS animation duration */ 500 +
      /* Small wait time */ 400
    ))
    .then(() => {
      // Only do the dancing menu thing when the user hasn't previously saved
      if (!hasPreviouslySaved) {
        highlightSavedPages(true); openMenu()
        wait(1500)
          .then(() => { highlightSavedPages(false); closeMenu() })
      }
    })
  },

  render () {
    const {
      article, saveArticle, removeSavedArticle, hasPreviouslySaved
    } = this.props
    const { title, data, saved } = article

    return (
      <div className='ActionBar'>
        <Icon type={types.LANGUAGE} />
        {flags.SAVE_PAGE
          ? <Icon type={saved ? types.UNSAVE : types.SAVE}
            className='ActionBar-save'
            onClick={() =>
              saved
                ? removeSavedArticle(title)
                : saveArticle(title, data.unwrap())
                  // Pass in hasPreviouslySaved from before we saved this
                  // article, otherwise it will always be true
                  .then(() => this.onSaveClick(hasPreviouslySaved))
            } />
          : null}
        {flags.DOWNLOAD_IN_ACTION_BAR
          ? <Icon type={types.DOWNLOAD} onClick={() =>
            window.open(printUrl({ title }))
          } /> : null}
        <Icon type={types.WATCH} />
        <Icon type={types.EDIT} />
      </div>
    )
  }
})

const stateToProps = ({currentArticle, toggles}) => ({
  article: currentArticle,
  hasPreviouslySaved: toggles.hasPreviouslySaved
})

const dispatchToProps = (dispatch, {title, data}) => ({
  openMenu: () => dispatch(Actions.OpenMenu),
  closeMenu: () => dispatch(Actions.CloseMenu),
  saveArticle: (title, article) =>
    dispatch(Actions.saveArticle(title, article)),
  removeSavedArticle: (title) =>
    dispatch(Actions.removeSavedArticle(title)),
  highlightSavedPages: (highlighted) =>
    dispatch(Actions.highlightSavedPages(highlighted))
})

export default connect(stateToProps, dispatchToProps)(ActionBar)

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
