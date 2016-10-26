import React from 'react'

import './special-page.css'

export default function ({title, subtitle, headerActions, children}) {
  return (
    <div className='SpecialPage'>
      <div className='SpecialPage-header'>
        <div className='SpecialPage-title'>
          <h2>{title}</h2>
          <p className='SpecialPage-subtitle'>{subtitle}</p>
        </div>
        <div className='SpecialPage-header-actions'>
          {headerActions}
        </div>
      </div>
      <div className='SpecialPage-content'>
        {children}
      </div>
    </div>
  )
}
