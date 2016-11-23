import React from 'react'
import CaptureClicks from '../capture-clicks'
import Section from '../section'
import LeadImage from '../lead-image'

import './flashcard.css'

export default React.createClass({

  componentDidMount () {
    document.body.classList.add('flashcard')
  },

  componentWillUnmount () {
    document.body.classList.remove('flashcard')
  },

  render () {
    const {article, print} = this.props
    const {displaytitle, sections: [lead], image} = article.lead

    return (
      <CaptureClicks>

        <div className='Flashcard'>

          <LeadImage style={{ margin: '0 -1em' }} image={image} />

          <h1 dangerouslySetInnerHTML={{__html: displaytitle}} />

          <Section html={lead.text} />

          {print ? <div style={{ opacity: 0 }}>~~PRINT-FINISHED~~</div> : null}

        </div>

      </CaptureClicks>
    )
  }
})
