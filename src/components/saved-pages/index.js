import React from 'react'
import { connect } from 'react-redux'
import Actions from '../../actions'
import SpecialPage from '../special-page'
import PageList from '../page-list'
import RemoteData from '../../data/remote-data'
import FakeText from '../fake-text'
import relativeDate from 'relative-date'
import prettyBytes from './pretty-bytes'
import Icon, {types} from '../icon'

import './saved-pages.css'

import savePlusOfflineImage from '../icon/icons/save-plus-offline.svg'

const SavedPages = React.createClass({

  componentDidMount () { this.props.getSavedPages() },

  render () {
    const {pages, hasSeenSavedPagesInfo, seenSavedPagesInfo} = this.props

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
        <div className='SavedPages'>
          {hasSeenSavedPagesInfo ? null : (
            <FirstTimeMessage onClose={seenSavedPagesInfo} />
          )}

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
        </div>
      </SpecialPage>
    )
  }
})

export default connect(
  ({ savedPages, persistentToggles }) => ({
    pages: savedPages.pages,
    hasSeenSavedPagesInfo: persistentToggles.hasSeenSavedPagesInfo
  }),
  (dispatch) => ({
    getSavedPages: () => dispatch(Actions.getSavedPages()),
    seenSavedPagesInfo: () =>
      dispatch(Actions.setPersistentToggle('hasSeenSavedPagesInfo', true))
  })
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

function FirstTimeMessage ({ onClose }) {
  return (
    <div className='SavedPages-FirstTimeMessage'>
      <p><img style={{ marginLeft: '5px' }} src={savePlusOfflineImage} /></p>
      <p>
        You can read these pages even when you are offline!
        <br />
        We recommend adding this page to your homescreen for easy access.
      </p>
      <p>
        <a className='SavedPages-FirstTimeMessage-close' onClick={onClose}>
          Got it!
        </a>
      </p>
    </div>
  )
}
