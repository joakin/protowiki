import React from 'react'
import { BrowserRouter, Match, Redirect, Miss } from 'react-router'
import { connect } from 'react-redux'
import Actions from '../../actions'
import ArticlePage from '../article-page'
import TrackOnlineStatus from '../track-online-status'
import Flashcard from '../flashcard'
import OnlineStatusBar from '../online-status-bar'
import Menu from '../menu'
import Footer from '../footer'
import Logo from '../logo'
import Icon, {types} from '../icon'
import SavedPages from '../saved-pages'
import flags from '../../flags'

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

function renderArticle ({ params }) {
  return <ArticlePage title={decodeURIComponent(params.title)} />
}

function renderFlashcard ({ params }) {
  return <ArticlePage title={decodeURIComponent(params.title)} component={Flashcard} />
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
