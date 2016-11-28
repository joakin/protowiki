import React from 'react'
import ReactDOM from 'react-dom'
import Icon, {types} from '../icon'
import CaptureClicks from '../capture-clicks'
import ActionBar from '../action-bar'
import Section from '../section'
import LeadImage from '../lead-image'
import {printFlashcardUrl} from '../../api'
import flags from '../../flags'
import OnlineStatusBar from '../online-status-bar'
import SavedPageStatusBar from '../saved-page-status-bar'

import './article.css'

export default React.createClass({

  componentDidMount () {
    document.body.classList.add('article')
    if (flags.DOWNLOAD_SUMMARY) {
      createGetSummaryElement(this.props.title)
    }
  },

  componentWillUnmount () {
    document.body.classList.remove('article')
    if (flags.DOWNLOAD_SUMMARY) { removeGetSummaryElement() }
  },

  render () {
    const {article, showLeadImage, print, isOnline, saved} = this.props
    const {displaytitle, description, sections: [lead], image} = article.lead
    const sections = article.remaining.sections

    return (
      <CaptureClicks>

        <div className='Article'>

          {showLeadImage && image
            ? <LeadImage style={{ margin: '0 -1em' }} image={image} /> : null}

          <h1 dangerouslySetInnerHTML={{__html: displaytitle}} />
          <p className='Article-description'>{description}</p>

          <ActionBar />

          <Section html={lead.text} />

          <div className='Article-body'>
            {sections.map(({id, line, text, anchor}) =>
              <Section key={id + '-' + line} title={line} html={text} />
            )}
          </div>

          {print ? <div style={{ opacity: 0 }}>~~PRINT-FINISHED~~</div> : null}

          {flags.ONLINE_STATUS_BAR
            ? <OnlineStatusBar online={isOnline} /> : null}

          {flags.MANUAL_ARTICLE_UPDATE && saved && isOnline
            ? <SavedPageStatusBar /> : null}

        </div>

      </CaptureClicks>
    )
  }
})

function createGetSummaryElement (title) {
  const summary =
    <a href={printFlashcardUrl({ title: title })}
      target='_blank' download={title + '.jpg'}>
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
