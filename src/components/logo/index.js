import React from 'react'

import logo from './logo.png'

export default function Logo ({size = 100}) {
  return (
    <img className='Logo' src={logo} width={212 * (size / 100)} />
  )
}
