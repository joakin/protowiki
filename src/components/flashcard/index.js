import React from 'react'
import CaptureClicks from '../capture-clicks'
import Section from '../section'
import LeadImage from '../lead-image'
import Logo from '../logo'
import quickfactImg from '../images/quickfact.svg'

import './flashcard.css'

export default React.createClass({

  componentDidMount () {
    document.body.classList.add('flashcard')
  },

  componentWillUnmount () {
    document.body.classList.remove('flashcard')
  },

  render () {
    const {title, article, print} = this.props
    const {displaytitle, sections: [lead], image} = article.lead
    console.log(this.props)

    return (
      <CaptureClicks>

        <div className='Flashcard'>

          <div className='Flashcard-header'>
            <Logo size={50} />
            <img src={quickfactImg} />
          </div>

          <LeadImage style={{ margin: '0 -1em' }} image={image} />

          <h1 dangerouslySetInnerHTML={{__html: displaytitle}} />

          <Section html={lead.text} />

          <div className='Flashcard-footer'>
            <a href='https://wikipedia.org/wiki/'>
              https://wikipedia.org/wiki/{title}
            </a>
          </div>

          {print ? <div style={{ height: '1px', opacity: 0 }}>~~PRINT-FINISHED~~</div> : null}

        </div>

      </CaptureClicks>
    )
  }
})
