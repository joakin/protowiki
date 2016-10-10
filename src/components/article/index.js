import React from 'react';
import CaptureClicks from '../capture-clicks'

import './article.css'

export default React.createClass({
  render () {
    const {article} = this.props
    const {displaytitle, description, sections: [lead]} = article.lead
    const sections = article.remaining.sections

    return (
      <CaptureClicks>
        <div>
          <p>{displaytitle}</p>
          <p>{description}</p>
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
