import React from 'react'
import * as articleDB from '../../db/article'
import {article} from '../../api'
import RemoteData from '../../data/remote-data'

export default React.createClass({

  getInitialState () {
    return { title: null, data: RemoteData.NotAsked() }
  },

  updateData (title, data) {
    if (this.state.title === title) {
      this.setState({ data })
    }
  },

  getArticle (title) {
    if (this.state.title !== title) {
      this.setState({ title, data: RemoteData.Loading() })

      articleDB
        .get(title)
        .then((dbArticle) => {
          const networkArticle = article(title)
            .then((article) => {
              if (
                !dbArticle ||
                (dbArticle && dbArticle.revision !== article.revision)
              ) {
                articleDB.set(title, article)
                this.updateData(title, RemoteData.Success(article))
              }
            })

          if (dbArticle) {
            this.updateData(title, RemoteData.Success(dbArticle))
          }

          return networkArticle
        })
        .catch((e) => {
          if (this.state.title === title) {
            RemoteData.match(this.state.data, {
              // Article came from DB, don't show error
              Success: _ => _,
              // If anything else happens then set the error
              _: _ => this.updateData(title, RemoteData.Failure(e))
            })
          }
          console.error(`Error: Failed to update article ${title}`)
          console.error(e)
        })
    }
  },

  componentDidMount () { this.getArticle(this.props.title) },

  componentWillReceiveProps (props) { this.getArticle(props.title) },

  render () {
    return this.props.children(this.state)
  }

})
