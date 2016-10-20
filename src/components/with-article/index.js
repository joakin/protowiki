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

      // Trigger network and cache requests in parallel
      const networkArticle = article(title)
      articleDB
        .get(title)
        .then((dbArticle) => {
          // Set the saved article if it exists
          if (dbArticle) {
            this.updateData(title, RemoteData.Success(dbArticle))
          }

          // When the network comes back
          return networkArticle.then((article) => {
            if (
              /* !dbArticle || // Don't save all articles now */
              // If the article was saved, update it in DB (if new revision)
              (dbArticle && dbArticle.revision !== article.revision)
            ) {
              // Auto-update currently viewed article
              this.updateData(title, RemoteData.Success(article))

              return articleDB.set(title, article)
            }
          })
        })
        .catch((e) => {
          if (this.state.title === title) {
            RemoteData.match(this.state.data, {
              // There's an good representation of an article being showed,
              // don't show error because it removes content.
              Success: _ => _,

              // If there's an error and there's no valid article content then
              // then set the error
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
