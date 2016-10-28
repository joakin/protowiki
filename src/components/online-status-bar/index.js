import React from 'react'
import Icon, {types} from '../icon'

import './online-status-bar.css'

export default function OnlineStatusBar ({online}) {
  return (
    <div className={'OnlineStatusBar ' + (!online ? 'offline' : '')}>
      <Icon type={types.OFFLINE} />
      Browsing { online ? 'online' : 'offline' }
    </div>
  )
}
