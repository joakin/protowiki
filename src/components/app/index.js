import React from 'react';
import { BrowserRouter, Match, Redirect, Miss } from 'react-router';
import WithArticle from '../with-article';
import WithOnline from '../with-online';
import Article from '../article';
import FakeText from '../fake-text';
import OnlineStatusBar from '../online-status-bar';
import Menu from '../menu'
import Footer from '../footer'
import Logo from '../logo'
import Icon, {types} from '../icon';
import flags from '../../flags'
import './App.css';

export default React.createClass({

  getInitialState () {
    return { isMenuOpen: false }
  },

  toggleMenu (visible) {
    this.setState({
      isMenuOpen: Boolean(visible)
    })
  },

  render () {
    return (
      <BrowserRouter>
        <WithOnline>{({online}) =>
          <div>
            <Menu isOpen={this.state.isMenuOpen}
              onItemClick={() => this.toggleMenu(false)} onBackdropClick={() => this.toggleMenu(false)} />
            <div className={'App ' + (!online ? 'is-offline' : '')}>
              <div className='App-header'>
                <div>
                  <Icon type={types.MENU} onClick={() => this.toggleMenu(true)} />
                </div>
                <Logo size={60} />
                <div>
                </div>
              </div>
              <div className='App-content'>
                <Match exactly pattern='/wiki/:title' component={ArticleContainer} />
                <Match exactly pattern='/about' component={About} />
                <Match exactly pattern='/' component={() =>
                  <Redirect to='/wiki/Wikimedia' />
                } />
                <Miss component={NoMatch} />
              </div>
              <Footer />
            </div>
            {flags.ONLINE_STATUS_BAR ?
              <OnlineStatusBar online={online} /> : null}
          </div>
        }</WithOnline>
      </BrowserRouter>
    );
  }
});

function ArticleContainer ({ params }) {
  return (
    <WithArticle title={params.title}>
      {({title, article}) =>
        article ?
          <Article title={title} article={article} /> :
          <FakeText />
      }
    </WithArticle>
  )
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
