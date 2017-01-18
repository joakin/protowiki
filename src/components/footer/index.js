import React from 'react'
import Logo from '../logo'
import msg from '../../i18n'

import './footer.css'

export default function Footer () {
  return (
    <div className='Footer'>
      <div className='Footer-logo'><Logo size={50} /><sup>®</sup></div>
      <p className='license'>
        {msg('content_is_available_under_cc_bysa___unless_otherwise_noted_')}
      </p>
      <ul className='Footer-links'>
        <li>
          <a href='//m.wikimediafoundation.org/wiki/Terms_of_Use'>
            {msg('terms_of_use')}</a>
        </li>
      </ul>
    </div>
  )
}
