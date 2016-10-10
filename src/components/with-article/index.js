import React from 'react';
import * as articleDB from '../../db/article'
import {article} from '../../api'

export default React.createClass({

  getInitialState () {
    return { title: null, article: null }
  },

  updateArticle (title, article) {
    if (this.state.title === title) {
      this.setState({ article })
    }
  },

  getArticle (title) {
    this.setState({ title })

    articleDB
      .get(title)
      .then((dbArticle) => {

        console.log(dbArticle)
        const networkArticle = article(title)
          .then((article) => {
            if (
              !dbArticle ||
              (dbArticle && dbArticle.revision !== article.revision)
            ) {
              articleDB.set(title, article)
              this.updateArticle(title, article)
            }
          })
          .catch(console.error)

        if (dbArticle) {
          this.updateArticle(title, dbArticle)
          return dbArticle
        } else {
          return networkArticle
        }

      })
      .catch(console.error)
  },

  componentDidMount () { this.getArticle(this.props.title) },

  componentWillReceiveProps (props) { this.getArticle(props.title) },

  render () {
    return this.props.children(this.state);
  }

})
