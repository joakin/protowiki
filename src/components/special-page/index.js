import React from 'react'

import './special-page.css'

export default function ({title, subtitle, children}) {
  return (
    <div className='SpecialPage'>
      <h2>{title}</h2>
      <p className='SpecialPage-subtitle'>{subtitle}</p>
      <div className='SpecialPage-content'>
        {children}
      </div>
    </div>
  )
}
