import React from 'react'
import { BrowserRouter, Match, Redirect, Miss } from 'react-router'
import { connect } from 'react-redux'
import Actions from '../../actions'
import ArticlePage from '../article-page'
import TrackOnlineStatus from '../track-online-status'
import LoadPersistentToggles from '../load-persistent-toggles'
import Flashcard from '../flashcard'
import Menu from '../menu'
import Footer from '../footer'
import Logo from '../logo'
import {IconLink, types} from '../icon'
import SavedPages from '../saved-pages'
import {getCurrentLanguage, setCurrentLanguage, getLanguages} from '../../i18n'

import './App.css'

function App ({isMenuOpen, isOnline, openMenu, closeMenu}) {
  return (
    <BrowserRouter>

      <Match pattern='/:lang?' render={({location, pathname, params}) => {
        if (getLanguages().indexOf(params.lang) === -1) {
          return <Redirect to={`/${getCurrentLanguage()}${location.pathname}`} />
        }

        setCurrentLanguage(params.lang)

        return (
        <div>

          <TrackOnlineStatus />
          <LoadPersistentToggles />

          <Menu isOpen={isMenuOpen}
            onItemClick={closeMenu} onBackdropClick={closeMenu} />

          <div className={'App ' + (!isOnline ? 'is-offline' : '')}>
            <div className='App-header'>
              <div>
                <IconLink type={types.MENU} onClick={openMenu} />
              </div>
              <Logo size={60} />
              <div>{/* Empty right side */}</div>
            </div>

            <div className='App-content'>

              <Match exactly pattern={`${pathname}/wiki/:title`} render={renderArticle} />
              <Match exactly pattern={`${pathname}/print/:title`} render={renderPrint} />
              <Match exactly pattern={`${pathname}/flashcard/:title`} render={renderFlashcard} />

              <Match exactly pattern={`${pathname}/about`} component={About} />
              <Match exactly pattern={`${pathname}/saved`} component={SavedPages} />
              <Match exactly pattern={`${pathname}/`} component={() =>
                <Redirect to='/en/wiki/Wikimedia' />
              } />

            </div>

            <Footer />
          </div>

        </div>
        )

      }} />

    </BrowserRouter>
  )
}

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

function renderPrint ({ params }) {
  return <ArticlePage title={decodeURIComponent(params.title)} print />
}

function renderFlashcard ({ params }) {
  return <ArticlePage title={decodeURIComponent(params.title)}
    component={Flashcard} print />
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
