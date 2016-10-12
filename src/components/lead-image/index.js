import React from 'react'

import './lead-image.css'

export default function ({image}) {
  const imageUrl = image && image.urls[Object.keys(image.urls)[0]]
  const backgroundImageStyle = {
    backgroundImage: `url(${imageUrl})`
  }

  return (
    <div className='LeadImage'>
      <div className='LeadImage-back' style={backgroundImageStyle} />
      <div className='LeadImage-front' style={backgroundImageStyle} />
    </div>
  )
}
