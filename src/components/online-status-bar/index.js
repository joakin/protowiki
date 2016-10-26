import React from 'react'
import './online-status-bar.css'

export default function OnlineStatusBar ({online}) {
  return (
    <div className={'OnlineStatusBar ' + (!online ? 'offline' : '')}>
      Browsing { online ? 'online' : 'offline' }
    </div>
  )
}
