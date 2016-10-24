import React from 'react'
import { BrowserRouter, Match, Redirect, Miss } from 'react-router'
import { connect } from 'react-redux'
import Actions from '../../actions'
import WithArticle from '../with-article'
import TrackOnlineStatus from '../track-online-status'
import Article from '../article'
import Flashcard from '../flashcard'
import FakeText from '../fake-text'
import OnlineStatusBar from '../online-status-bar'
import Menu from '../menu'
import Footer from '../footer'
import Logo from '../logo'
import Icon, {types} from '../icon'
import SavedPages from '../saved-pages'
import flags from '../../flags'
import RemoteData from '../../data/remote-data'

import './App.css'

const App = React.createClass({

  render () {
    const {isMenuOpen, isOnline, openMenu, closeMenu} = this.props

    return (
      <BrowserRouter>

        <div>

          <TrackOnlineStatus />

          <Menu isOpen={isMenuOpen}
            onItemClick={closeMenu} onBackdropClick={closeMenu} />

          <div className={'App ' + (!isOnline ? 'is-offline' : '')}>
            <div className='App-header'>
              <div>
                <Icon type={types.MENU} onClick={openMenu} />
              </div>
              <Logo size={60} />
              <div>{/* Empty right side */}</div>
            </div>

            <div className='App-content'>

              <Match exactly pattern='/wiki/:title' render={renderArticle} />
              <Match exactly pattern='/flashcard/:title' render={renderFlashcard} />

              <Match exactly pattern='/about' component={About} />
              <Match exactly pattern='/saved' component={SavedPages} />
              <Match exactly pattern='/' component={() =>
                <Redirect to='/wiki/Wikimedia' />
              } />
              <Miss component={NoMatch} />

            </div>

            <Footer />
          </div>

          {flags.ONLINE_STATUS_BAR
            ? <OnlineStatusBar online={isOnline} /> : null}

        </div>

      </BrowserRouter>
    )
  }
})

const stateToProps = ({menu, online}) => ({
  isMenuOpen: menu.isOpen,
  isOnline: online
})

const dispatchToProps = (dispatch) => ({
  openMenu: () => dispatch(Actions.OpenMenu),
  closeMenu: () => dispatch(Actions.CloseMenu)
})

export default connect(stateToProps, dispatchToProps)(App)

function renderArticle ({ params }, render) {
  return (
    <WithArticle title={decodeURIComponent(params.title)}>
      {({title, data, origin}) =>
        RemoteData.match(data, {
          NotAsked: _ => null,
          Loading: _ => <FakeText />,
          Success: article =>
            render ? render({ title, article, origin })
              : <Article title={title} article={article} origin={origin} />,
          Failure: e =>
            <div>
              <h1>{title}</h1>
              <p>There was a problem retrieving <em>{title}</em></p>
            </div>
        })
      }
    </WithArticle>
  )
}

function renderFlashcard (props) {
  return renderArticle(props, (ps) => <Flashcard {...ps} />)
}

function NoMatch () {
  return (
    <p>Not found</p>
  )
}

function About () {
  return (
    <div>
      <p>This is a prototype</p>
      <dl>
        <dt>id</dt>
        <dd>{process.env.REACT_APP_PROTOTYPE}</dd>
      </dl>
    </div>
  )
}
