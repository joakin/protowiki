import React from 'react'

import './icon.css'

export default function ({ type, className, ...attrs }) {
  return <div {...attrs} className={`Icon is-type-${type} ${className || ''}`}/>
}

export const types = {
  MENU: 'menu',
  CLOSE: 'close',
  HOME: 'home',
  HISTORY: 'history',
  ARROW: 'arrow',
  DOWNLOAD: 'download',
  EDIT: 'edit',
  WATCH: 'watch',
  LANGUAGE: 'language',
  GET_SUMMARY: 'get-summary',
  SAVE: 'save',
  UNSAVE: 'unsave'
}
