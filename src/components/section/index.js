import React from 'react'

import './section.css'

export default function Section ({title, html}) {
  return (
    <div className='Section is-open'>
      {title ?
        <h2 dangerouslySetInnerHTML={{ __html: title}} /> : null}
      <div className='Section-body' dangerouslySetInnerHTML={{ __html: html}} />
    </div>
  )
}
