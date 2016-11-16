import React from 'react'
import Logo from '../logo'

import './footer.css'

export default function Footer () {
  return (
    <div className='Footer'>
      <div className='Footer-logo'><Logo size={50} /><sup>®</sup></div>
      <p className='license'>
        Content is available under
        {' '}<a className='external' rel='nofollow' href='//creativecommons.org/licenses/by-sa/3.0/'>
          CC BY-SA 3.0
        </a>{' '}
        unless otherwise noted.
      </p>
      <ul className='Footer-links'>
        <li>
          <a href='//m.wikimediafoundation.org/wiki/Terms_of_Use'>
          Terms of Use</a>
        </li>
      </ul>
    </div>
  )
}
