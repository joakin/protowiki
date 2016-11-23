import React from 'react'

import './image.css'

export default function Image ({url, width = 'auto', height = 'auto', style}) {
  const containerStyle = {
    width, height
  }
  const backgroundImageStyle = {
    backgroundImage: `url(${url})`
  }

  return (
    <div className='Image' style={{...style, ...containerStyle}}>
      <div className='Image-back' style={backgroundImageStyle} />
      <div className='Image-front' style={backgroundImageStyle} />
    </div>
  )
}
