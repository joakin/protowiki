import React from 'react'
import Image from '../image'

export default function LeadImage ({image}) {
  const imageUrl = image && image.urls[Object.keys(image.urls)[0]]
  return <Image url={imageUrl} width='100%' height='200px' />
}

