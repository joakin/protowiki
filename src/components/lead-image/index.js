import React from 'react'
import Image from '../image'

export default function LeadImage ({image, style}) {
  const imageUrl = image && image.urls[Object.keys(image.urls)[0]]
  return <Image url={imageUrl} height='165px' style={style} />
}

