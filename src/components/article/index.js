import React from 'react';
import CaptureClicks from '../capture-clicks'

import './article.css'

export default React.createClass({
  render () {
    const {article} = this.props
    const {displaytitle, description, sections: [lead], image} = article.lead
    const sections = article.remaining.sections
    const imageUrl = image && image.urls[Object.keys(image.urls)[0]]

    return (
      <CaptureClicks>
        <div className='Article'>
          {image ?
            <div className='Article-leadimage' style={{
              backgroundImage: `url(${imageUrl})`
            }} /> :
            null}
          <h1>{displaytitle}</h1>
          <p className='Article-description'>{description}</p>
          <div className='Section is-open'>
            <div className='Section-body' dangerouslySetInnerHTML={{ __html: lead.text}} />
          </div>
          <div>
          {sections.map(({id, line, text}) =>
            <div key={id + '-' + line} className='Section is-open'>
              <h2>{line}</h2>
              <div className='Section-body' dangerouslySetInnerHTML={{ __html: text}} />
            </div>
          )}
          </div>
        </div>
      </CaptureClicks>
    )
  }
})

// <Icon type={types.ARROW} className='Section-toggle-icon'/>
