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
    const url = printUrl({
      title: this.props.title
    });
    window.open(url);
  },

  downloadSummary() {
    console.log('Fetch article summary');
  },

  createGetSummaryElement() {
    const summary =
      <a onClick={this.downloadSummary}>
        <Icon type={types.GET_SUMMARY} />
        <span>Get article summary (JPG 15kb)</span>
      </a>;
    const firstParagraph = document.querySelector('.Section-body p');
    const wrapper = document.createElement('div');
    wrapper.className = 'get-summary';

    if (firstParagraph) {
      firstParagraph.appendChild(wrapper);
      ReactDOM.render(summary, wrapper);
    } else {
      console.warn('No infobox nor section found, remove container');
    }
  },

  componentDidMount() {
    if (flags.DOWNLOAD_SUMMARY) {
      this.createGetSummaryElement();
    }
  },

  componentWillUnmount() {
    if (flags.DOWNLOAD_SUMMARY) {
      ReactDOM.unmountComponentAtNode(document.querySelector('.get-summary'));
    }
  },

  render () {
    const {article} = this.props
    const {displaytitle, description, sections: [lead], image} = article.lead
    const sections = article.remaining.sections

    return (
      <CaptureClicks>
        <div className='Article'>
          {false && image ?
            <LeadImage image={image} /> :
            null}
          <h1 dangerouslySetInnerHTML={{ __html: displaytitle}} />
          <p className='Article-description'>{description}</p>
          <ActionBar onDownload={this.downloadArticle}/>
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

function printUrl ({title, pageSize = 'A5', marginsType = 0}) {
  return `https://pdf-electron.wmflabs.org/pdf?` +
    `accessKey=secret&delay=5&` +
    `url=${encodeURIComponent(`https://autowiki.surge.sh/wiki/${title}`)}&` +
    `pageSize=${pageSize}&marginsType=${marginsType}`
}

// <Icon type={types.ARROW} className='Section-toggle-icon'/>
