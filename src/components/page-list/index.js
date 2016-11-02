import React from 'react'
import Image from '../image'
import {Link} from 'react-router'

import './page-list.css'

export default function PageList ({pages, whenEmpty, footer}) {
  return (
    <div className='PageList'>
      {pages && pages.length
        ? pages.map((page, i) =>
          <div key={'page' + i} className='PageList-item'>
            <Image width='88px' height='88px'
              url={page.image && page.image.urls[Object.keys(page.image.urls)[0]]} />

            <div className='PageList-item-contents'>
              <Link className='PageList-item-link' to={`/wiki/${encodeURIComponent(page.title)}`} />
              <div className='PageList-item-header'>
                <div className='PageList-item-title'
                  dangerouslySetInnerHTML={{ __html: page.displaytitle }} />
                <div className='PageList-item-subtitle'
                  dangerouslySetInnerHTML={{ __html: page.description }} />
              </div>
              <div className='PageList-item-footer'>
                {footer(page)}
              </div>
            </div>
          </div>)
        : whenEmpty ? whenEmpty() : null
      }
    </div>
  )
}
