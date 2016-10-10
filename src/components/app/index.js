import React from 'react';
import { BrowserRouter, Match, Redirect, Miss } from 'react-router';
import WithArticle from '../with-article';
import Article from '../article';
import FakeText from '../fake-text';
import './App.css';

export default React.createClass({
  render () {
    return (
      <BrowserRouter>
        <div className='App'>
          <div className='App-header'>
            <h1>Wikipedia</h1>
          </div>
          <div className='App-intro'>
            <Match exactly pattern='/wiki/:title' component={ArticleContainer} />
            <Match exactly pattern='/' component={() =>
              <Redirect to='/wiki/Wikimedia' />
            } />
            <Miss component={NoMatch}/>
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
