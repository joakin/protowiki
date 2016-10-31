import React from 'react'

import './icon.css'

export default function Icon ({ tag = 'div', type, className, ...attrs }) {
  return React.createElement(
    tag,
    {
      ...attrs,
      className: `Icon is-type-${type} ${className || ''}`
    }
  )
}

export function IconLink (props) {
  return <Icon tag='a' {...props} />
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
  UNSAVE: 'unsave',
  SAVEDPAGES: 'savedpages',

  ANONYMOUS: 'anonymous',
  CONTRIBUTIONS: 'contributions',
  NEARBY: 'nearby',
  PROFILE: 'profile',
  RANDOM: 'random',
  SETTINGS: 'settings',
  WATCHLIST: 'watchlist',

  GREENCHECK: 'green-check',
  OFFLINE: 'offline'
}
