import React from 'react';
import WithArticle from '../with-article';
import Article from '../article';
import './App.css';

export default React.createClass({
  render () {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Wikipedia</h1>
        </div>
        <div className="App-intro">
          <WithArticle title='Banana'>
            {({title, article}) =>
              article ?
                <Article title={title} article={article} /> :
                <p>Loading</p>
            }
          </WithArticle>
        </div>
      </div>
    );
  }
});
