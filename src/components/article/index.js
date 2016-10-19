import React from 'react';
import CaptureClicks from '../capture-clicks'
import Icon, {types} from '../icon'
import ActionBar from '../action-bar'
import Section from '../section'
import LeadImage from '../lead-image'
import flags from '../../flags'
import ReactDOM from 'react-dom';

import './article.css'

export default React.createClass({

  downloadArticle () {
    const url = getPrintPDFUrl({
      title: this.props.title
    });
    window.open(url);
  },

  downloadSummary() {
    const url = getPrintFlashcardUrl({
      title: this.props.title
    });
    window.open(url);
  },

  createGetSummaryElement() {
    const summary =
      <a onClick={this.downloadSummary}>
        <Icon type={types.GET_SUMMARY} />
        <span>Get article summary (JPG 15kb)</span>
      </a>;
    const firstParagraph = document.querySelector('.Section-body p');
    const wrapper = document.createElement('div');
    wrapper.className = 'Article-get-summary';

    if (firstParagraph) {
      firstParagraph.appendChild(wrapper);
      ReactDOM.render(summary, wrapper);
    } else {
      console.warn('No infobox nor section found, remove container');
    }
  },

  componentDidMount() {
    if (this.props.isFlashcard === true) {
      document.body.classList.add('flashcard')
    } else {
      document.body.classList.remove('flashcard')
    }
    if (flags.DOWNLOAD_SUMMARY) {
      this.createGetSummaryElement();
    }
  },

  componentWillUnmount() {
    if (flags.DOWNLOAD_SUMMARY) {
      ReactDOM.unmountComponentAtNode(document.querySelector('.Article-get-summary'));
    }
  },

  render () {
    const {article, onSave} = this.props
    const {displaytitle, description, sections: [lead], image} = article.lead
    const sections = article.remaining.sections

    return (
      <CaptureClicks>
        <div className='Article'>
          {this.props.isFlashcard && image
            ? <LeadImage image={image} /> : null}
          <h1 dangerouslySetInnerHTML={{ __html: displaytitle}} />
          <p className='Article-description'>{description}</p>
          <ActionBar
            onDownload={this.downloadArticle}
            onSave={onSave} />
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

function getPrintingServiceUrl (type, delay, url, pageSize = 'A5', marginsType = 0) {
  return `https://pdf-electron.wmflabs.org/${type}?` +
      `accessKey=secret&delay=${delay}&` +
      `url=${encodeURIComponent(url)}&` +
      `pageSize=${pageSize}&marginsType=${marginsType}`
}

const printOrigin = window.location.host.indexOf('localhost') === 0
  ? 'http://autowiki.surge.sh' : window.location.origin

function getPrintFlashcardUrl ({title}) {
  return getPrintingServiceUrl('pdf', 10, `${printOrigin}/flashcard/${title}`, 'A5', 0)
}

function getPrintPDFUrl ({title, pageSize = 'A5', marginsType = 0}) {
  return getPrintingServiceUrl('pdf', 10, `${printOrigin}/wiki/${title}`, pageSize, marginsType)
}

// <Icon type={types.ARROW} className='Section-toggle-icon'/>
