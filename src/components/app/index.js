import React from 'react';
import { BrowserRouter, Match, Redirect, Miss } from 'react-router';
import WithArticle from '../with-article';
import Article from '../article';
import FakeText from '../fake-text';
import Menu from '../menu'
import Icon, {types} from '../icon';
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
        <div>
          <Menu isOpen={this.state.isMenuOpen}
            onItemClick={() => this.toggleMenu(false)} onBackdropClick={() => this.toggleMenu(false)} />
          <div className='App'>
            <div className='App-header'>
              <div>
                <Icon type={types.MENU} onClick={() => this.toggleMenu(true)} />
              </div>
              <span className='App-logo'>WikipediA</span>
              <div>
              </div>
            </div>
            <div className='App-content'>
              <Match exactly pattern='/wiki/:title' component={ArticleContainer} />
              <Match exactly pattern='/about' component={About} />
              <Match exactly pattern='/' component={() =>
                <Redirect to='/wiki/Wikimedia' />
              } />
              <Miss component={NoMatch}/>
            </div>
          </div>
        </div>
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
