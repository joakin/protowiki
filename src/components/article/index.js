import React from 'react'
import ReactDOM from 'react-dom'
import Icon, {types} from '../icon'
import CaptureClicks from '../capture-clicks'
import ActionBar from '../action-bar'
import Section from '../section'
import LeadImage from '../lead-image'
import {printFlashcardUrl} from '../../api'
import flags from '../../flags'

import './article.css'

export default React.createClass({

  componentDidMount () {
    if (flags.DOWNLOAD_SUMMARY) {
      createGetSummaryElement(this.downloadSummary)
    }
  },

  componentWillUnmount () {
    if (flags.DOWNLOAD_SUMMARY) { removeGetSummaryElement() }
  },

  downloadSummary () {
    window.open(printFlashcardUrl({ title: this.props.title }))
  },

  render () {
    const {article, showLeadImage} = this.props
    const {displaytitle, description, sections: [lead], image} = article.lead
    const sections = article.remaining.sections

    return (
      <CaptureClicks>

        <div className='Article'>

          {showLeadImage && image
            ? <LeadImage image={image} /> : null}

          <h1 dangerouslySetInnerHTML={{__html: displaytitle}} />
          <p className='Article-description'>{description}</p>

          <ActionBar />

          <Section html={lead.text} />

          <div className='Article-body'>
            {sections.map(({id, line, text, anchor}) =>
              <Section key={id + '-' + line} title={line} html={text} />
            )}
          </div>

        </div>

      </CaptureClicks>
    )
  }
})

function createGetSummaryElement (downloadSummary) {
  const summary =
    <a onClick={downloadSummary}>
      <Icon type={types.GET_SUMMARY} />
      <span>Get article summary (JPG 15kb)</span>
    </a>
  const firstParagraph = document.querySelector('.Section-body p')
  const wrapper = document.createElement('div')
  wrapper.className = 'Article-get-summary'

  if (firstParagraph) {
    firstParagraph.appendChild(wrapper)
    ReactDOM.render(summary, wrapper)
  } else {
    console.warn('No infobox nor section found, remove container')
  }
}

function removeGetSummaryElement () {
  ReactDOM.unmountComponentAtNode(document.querySelector('.Article-get-summary'))
}
