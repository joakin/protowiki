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
import SavedAgo from '../saved-ago'
import msg from '../../i18n'

import './saved-pages.css'

import savePlusOfflineImage from '../icon/icons/save-plus-offline.svg'

const SavedPages = React.createClass({

  componentDidMount () { this.props.getSavedPages() },

  render () {
    const {pages, hasSeenSavedPagesInfo, seenSavedPagesInfo} = this.props

    const count = (pages.withDefault([]) || []).length
    const subtitle = msg('_pages', [count])

    return (
      <SpecialPage title={msg('saved_pages')} subtitle={subtitle}
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
              <PageList
                pages={pages.map((page) => ({
                  ...page, url: `/${page.lang || 'en'}/wiki/${encodeURIComponent(page.title)}`
                }))}
                whenEmpty={() => <SavedPagesError>You don't have any saved pages</SavedPagesError>}
                footer={(page) => [
                  <div key='up' className='PageList-item-last-updated'>
                    <SavedAgo date={page.lastSave} />
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
      {msg('offline')}
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
        {msg('you_can_read_these_pages_even_when_you_are_offline')}
        <br />
        {msg('we_recommend_adding_this_page_to_your_homescreen_for_easy_access_')}
      </p>
      <p>
        <a className='SavedPages-FirstTimeMessage-close' onClick={onClose}>
          {msg('got_it')}
        </a>
      </p>
    </div>
  )
}
