import React from 'react'
import { connect } from 'react-redux'
import Actions from '../../actions'
import SpecialPage from '../special-page'
import Image from '../image'
import RemoteData from '../../data/remote-data'
import FakeText from '../fake-text'
import {Link} from 'react-router'
import relativeDate from 'relative-date'
import prettyBytes from './pretty-bytes'
import Icon, {types} from '../icon'

import './saved-pages.css'

const SavedPages = React.createClass({

  componentDidMount () { this.props.getSavedPages() },

  render () {
    const {pages} = this.props

    const count = (pages.withDefault([]) || []).length
    const subtitle = count
      ? `${count} page${count > 1 ? 's' : ''}`
      : ''

    return (
      <SpecialPage title='Saved pages' subtitle={subtitle}
        headerActions={
          <OfflineMarker />
        }
      >
        {RemoteData.match(pages, {
          NotAsked: _ => null,

          Loading: _ => <FakeText />,

          Failure: _ =>
            <SavedPagesError>Failed to retrieve the list of pages</SavedPagesError>,

          Success: pages =>
            <PageList pages={pages}
              whenEmpty={() => <SavedPagesError>You don't have any saved pages</SavedPagesError>}
              footer={(page) => [
                <div key='up' className='PageList-item-last-updated'>
                  Saved {relativeDate(page.lastSave)}
                </div>,
                <div key='si' className='PageList-item-size'>
                  {prettyBytes(page.size)}
                </div>
              ]} />
        })}
      </SpecialPage>
    )
  }
})

export default connect(
  ({ savedPages }) => ({ pages: savedPages.pages }),
  (dispatch) => ({ getSavedPages: () => dispatch(Actions.getSavedPages()) })
)(SavedPages)

function OfflineMarker () {
  return (
    <div className='OfflineMarker'>
      <Icon type={types.GREENCHECK} />
      Offline
    </div>
  )
}

function SavedPagesError ({children}) {
  return <p className='SavedPages-error'>{children}</p>
}

function PageList ({pages, whenEmpty, footer}) {
  return (
    <div className='PageList'>
      {pages && pages.length
        ? pages.map((page, i) =>
          <div key={'page' + i} className='PageList-item'>
            <Image width='88px' height='88px'
              url={page.image && page.image.urls[Object.keys(page.image.urls)[0]]} />

            <div className='PageList-item-contents'>
              <Link className='PageList-item-link' to={`/wiki/${encodeURIComponent(page.title)}`} />
              <div className='PageList-item-header'>
                <div className='PageList-item-title'
                  dangerouslySetInnerHTML={{ __html: page.displaytitle }} />
                <div className='PageList-item-subtitle'
                  dangerouslySetInnerHTML={{ __html: page.description }} />
              </div>
              <div className='PageList-item-footer'>
                {footer(page)}
              </div>
            </div>
          </div>)
        : whenEmpty ? whenEmpty() : null
      }
    </div>
  )
}
