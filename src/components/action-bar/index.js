import React from 'react'
import Icon, {types} from '../icon'
import flags from '../../flags'

import './action-bar.css'

export default function ActionBar ({onDownload, onSave}) {
  return (
    <div className='ActionBar'>
      <Icon type={types.LANGUAGE}/>
      {flags.SAVE_PAGE ?
        <Icon type={types.DOWNLOAD} onClick={onSave}/> : null}
      {flags.DOWNLOAD_IN_ACTION_BAR ?
        <Icon type={types.DOWNLOAD} onClick={onDownload}/> : null}
      <Icon type={types.WATCH}/>
      <Icon type={types.EDIT}/>
    </div>
  )
}
