import React from 'react'
import SpecialPage from '../special-page'
import Image from '../image'
import RemoteData from '../../data/remote-data'
import {get} from '../../db/saved-pages'
import FakeText from '../fake-text'
import {Link} from 'react-router'
import relativeDate from 'relative-date'
import prettyBytes from 'pretty-bytes'

import './saved-pages.css'

export default React.createClass({

  getInitialState () {
    return {
      pages: RemoteData.NotAsked()
    }
  },

  getPages () {
    this.setState({ pages: RemoteData.Loading() })
    get().then((pages) => this.setState({ pages: RemoteData.Success(pages) }))
      .catch((e) => {
        console.error(e)
        this.setState({ pages: RemoteData.Failure(e) })
      })
  },

  componentDidMount () { this.getPages() },

  render () {
    const {pages} = this.state

    const subtitle = RemoteData.match(pages, {
      Success: pages => pages && pages.length
        ? `${pages.length} page${pages.length > 1 ? 's' : ''}`
        : '',
      _: _ => ''
    })

    return (
      <SpecialPage title='Saved pages' subtitle={subtitle}>
        {RemoteData.match(this.state.pages, {
          NotAsked: _ => null,

          Loading: _ => <FakeText />,

          Failure: _ =>
            <p>Failed to retrieve the list of pages</p>,

          Success: pages =>
            <div className='PageList'>
              {pages && pages.length
                ? pages.map((page, i) =>
                  <div key={'page' + i} className='PageList-item'>
                    <Image width='88px' height='88px'
                      url={page.image && page.image.urls[Object.keys(page.image.urls)[0]]} />

                    <div className='PageList-item-contents'>
                      <Link className='PageList-item-link' to={`/wiki/${encodeURIComponent(page.title)}`} />
                      <div className='PageList-item-header'>
                        <div className='PageList-item-title'>{page.displaytitle}</div>
                        <div className='PageList-item-subtitle'>
                          {page.description}
                        </div>
                      </div>
                      <div className='PageList-item-footer'>
                        <div className='PageList-item-last-updated'>
                          Saved {relativeDate(page.lastSave)}
                        </div>
                        <div className='PageList-item-size'>
                          {prettyBytes(page.size)}
                        </div>
                      </div>
                    </div>
                  </div>)
                : <p>You don't have any saved pages</p>
              }
            </div>
        })}
      </SpecialPage>
    )
  }
})
