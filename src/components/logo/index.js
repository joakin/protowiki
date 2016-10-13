import React from 'react'

import logo from './logo.png'
import './logo.css'

export default function Logo ({size = 100, spin = false}) {
  return (
    <img className={'Logo ' + (spin ? 'spinning' : '')}
      src={logo} width={212 * (size / 100)} />
  )
}
