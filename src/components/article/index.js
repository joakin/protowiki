import React from 'react';
import CaptureClicks from '../capture-clicks'
import Icon, {types} from '../icon'
import flags from '../../flags'

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

  moveGetSummaryContainer() {
    const summary = document.querySelector('div.get-summary');
    const firstParagraph = document.querySelector('.Section-body p');

    if (firstParagraph) {
      firstParagraph.appendChild(summary);
    } else {
      console.warn('No infobox nor section found, remove container');
      document.querySelector('.Article').removeChild(summary);
    }
  },

  componentDidMount() {
    if (flags.DOWNLOAD_SUMMARY) {
      this.moveGetSummaryContainer();
    }
  },

  render () {
    const {article} = this.props
    const {displaytitle, description, sections: [lead], image} = article.lead
    const sections = article.remaining.sections
    const imageUrl = image && image.urls[Object.keys(image.urls)[0]]

    return (
      <CaptureClicks>
        <div className='Article'>
          {false && image ?
            <div className='Article-leadimage' style={{
              backgroundImage: `url(${imageUrl})`
            }} /> :
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
          {flags.DOWNLOAD_SUMMARY ?
              <div className="get-summary">
                  <a onClick={ this.downloadSummary }>
                      <Icon type={types.GET_SUMMARY} />
                      <span>Get article summary (JPG 15kb)</span>
                  </a>
              </div> : null
          }



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

function ActionBar ({onDownload}) {
  return (
    <div className='ActionBar'>
      <Icon type={types.LANGUAGE}/>
      {flags.DOWNLOAD_IN_ACTION_BAR ?
        <Icon type={types.DOWNLOAD} onClick={onDownload}/> : null}
      <Icon type={types.WATCH}/>
      <Icon type={types.EDIT}/>
    </div>
  )
}

function printUrl ({title, pageSize = 'A5', marginsType = 0}) {
  return `https://pdf-electron.wmflabs.org/pdf?` +
    `accessKey=secret&delay=5&` +
    `url=${encodeURIComponent(`https://autowiki.surge.sh/wiki/${title}`)}&` +
    `pageSize=${pageSize}&marginsType=${marginsType}`
}

// <Icon type={types.ARROW} className='Section-toggle-icon'/>
