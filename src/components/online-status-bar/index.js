import React from 'react'
import Icon, {types} from '../icon'

import './online-status-bar.css'

export default function OnlineStatusBar ({online}) {
  const reading = window.location.pathname.indexOf('/wiki') === 0
  return (
    <div className={'OnlineStatusBar ' + (!online ? 'offline' : '')}>
      <Icon type={types.OFFLINE} />
      {(reading ? 'Reading' : 'Browsing') + ' ' +
       (online ? 'online' : 'offline')}
    </div>
  )
}
