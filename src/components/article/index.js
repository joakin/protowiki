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
          <h1 dangerouslySetInnerHTML={{ __html: displaytitle}} />
          <p className='Article-description'>{description}</p>
          <Section html={lead.text} />
          <div>
          {sections.map(({id, line, text, anchor}) =>
            <Section key={id + '-' + line} title={line} html={text} />
          )}
          </div>
        </div>
      </CaptureClicks>
    )
  }
})

function Section ({title, html}) {
  return (
    <div className='Section is-open'>
      {title ?
        <h2 dangerouslySetInnerHTML={{ __html: title}} /> : null}
      <div className='Section-body' dangerouslySetInnerHTML={{ __html: html}} />
    </div>
  )
}

// <Icon type={types.ARROW} className='Section-toggle-icon'/>
