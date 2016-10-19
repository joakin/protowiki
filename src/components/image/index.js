import React from 'react'

import './image.css'

export default function Image ({url, width = '100%', height = 'auto'}) {
  const containerStyle = {
    width, height
  }
  const backgroundImageStyle = {
    backgroundImage: `url(${url})`
  }

  return (
    <div className='Image' style={containerStyle}>
      <div className='Image-back' style={backgroundImageStyle} />
      <div className='Image-front' style={backgroundImageStyle} />
    </div>
  )
}
