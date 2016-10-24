import React from 'react'
import ReactDOM from 'react-dom'
import Icon, {types} from '../icon'
import CaptureClicks from '../capture-clicks'
import ActionBar from '../action-bar'
import Section from '../section'
import LeadImage from '../lead-image'
import {printUrl, printFlashcardUrl} from '../../api'
import flags from '../../flags'
import * as savedPages from '../../db/saved-pages'

import './article.css'

export default React.createClass({

  getInitialState () {
    return {
      saved: false
    }
  },

  componentDidMount () {
    if (flags.DOWNLOAD_SUMMARY) {
      createGetSummaryElement(this.downloadSummary)
    }
  },

  componentWillUnmount () {
    if (flags.DOWNLOAD_SUMMARY) { removeGetSummaryElement() }
  },

  setSavedFromOrigin (origin) {
    if (this.props.origin.isSaved()) {
      this.setState({ saved: true })
    }
  },

  componentWillMount () { this.setSavedFromOrigin(this.props.origin) },

  componentWillReceiveProps (nextProps) { this.setSavedFromOrigin(this.props.origin) },

  onSave (...args) {
    // Save to DB
    savedPages.set(this.props.title, this.props.article)
    this.setState({ saved: true })
  },

  onUnsave () {
    savedPages.remove(this.props.title)
    this.setState({ saved: false })
  },

  openPrintUrl (getUrl) {
    window.open(getUrl({ title: this.props.title }))
  },

  downloadArticle () { this.openPrintUrl(printUrl) },
  downloadSummary () { this.openPrintUrl(printFlashcardUrl) },

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

          <ActionBar
            saved={this.state.saved}
            onDownload={this.downloadArticle}
            onSave={this.onSave} onUnsave={this.onUnsave} />

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
