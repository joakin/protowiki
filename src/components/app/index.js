import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
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

      <Route path='/:lang?' render={({match, location}) => {
        const {url, params} = match
        if (!params.lang || getLanguages().indexOf(params.lang) === -1) {
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

              <Switch>
                <Route exact path={`${url}/wiki/:title`} render={renderArticle} />
                <Route exact path={`${url}/print/:title`} render={renderPrint} />
                <Route exact path={`${url}/flashcard/:title`} render={renderFlashcard} />

                <Route exact path={`${url}/about`} component={About} />
                <Route exact path={`${url}/saved`} component={SavedPages} />
                <Route exact path={`${url}`} render={() =>
                  <Redirect to={`/${params.lang}/wiki/Main_page`} />
                } />

                <Route component={NoMatch}/>
              </Switch>
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

function renderArticle ({ match: { params } }) {
  return <ArticlePage title={decodeURIComponent(params.title)} />
}

function renderPrint ({ match: { params } }) {
  return <ArticlePage title={decodeURIComponent(params.title)} print />
}

function renderFlashcard ({ match: { params } }) {
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
