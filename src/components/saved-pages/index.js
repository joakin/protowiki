import React from 'react'
import SpecialPage from '../special-page'
import Image from '../image'

import './saved-pages.css'

export default function () {
  return (
    <SpecialPage title='Saved pages' subtitle='1 page'>
      <div className='PageList'>
        <div className='PageList-item'>
          <Image url='https://placekitten.com/200/300' width='96px' height='96px' />
          <div className='PageList-item-contents'>
            <div className='PageList-item-title'>Banana</div>
            <div className='PageList-item-subtitle'>
              Phone
              <br />
              <br />
              Hi
            </div>
          </div>
        </div>
      </div>
    </SpecialPage>
  )
}
