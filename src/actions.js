import * as articleDB from './db/article'
import * as savedPages from './db/saved-pages'
import * as persistentToggles from './db/persistent-toggles'
import RemoteData from './data/remote-data'
import {article} from './api'

export default {

  // Menu
  OpenMenu: { type: 'OpenMenu' },
  CloseMenu: { type: 'CloseMenu' },

  // Online status
  Online: { type: 'Online' },
  Offline: { type: 'Offline' },

  // Current article
  getArticle (title) {
    return (dispatch, getStore) => {
      const currentArticle = () => getStore().currentArticle

      if (currentArticle().title !== title) {
        dispatch({ type: 'GetArticle', title })

        // Trigger network and cache requests in parallel
        const networkArticle = article(title)
        return articleDB
          .get(title)
          .then((dbArticle) => {
            // Set the saved article if it exists
            if (dbArticle) {
              dispatch({ type: 'FromDB', title, article: dbArticle })
            }

            return networkArticle.then((article) => {
              dispatch({ type: 'FromNetwork', title, article })

              // Save article only if previously saved and network article is
              // newer
              if (dbArticle && dbArticle.revision !== article.revision) {
                return articleDB.set(title, article)
              }
            })
          })
          .catch((error) => {
            dispatch({ type: 'GetArticleFailure', title, error })
            console.error(`Error: Failed to update article ${title}`)
            console.error(error)
          })
      }
    }
  },

  // Saved pages
  getSavedPages () {
    return (dispatch, getState) => {
      return RemoteData.match(getState().savedPages.pages, {
        // If there's a pages request in progress, do nothing
        Loading: _ => Promise.resolve(),

        // Otherwise request them
        _: _ => {
          dispatch({ type: 'SavedPages', pages: RemoteData.Loading() })
          return savedPages.get()
            .then((pages) => {
              dispatch({ type: 'SavedPages', pages: RemoteData.Success(pages) })
            })
            .catch((e) => {
              console.error(e)
              dispatch({ type: 'SavedPages', pages: RemoteData.Failure(e) })
            })
        }
      })
    }
  },

  saveArticle (title, article) {
    return (dispatch) => {
      return savedPages.set(title, article)
        .then((pages) => {
          dispatch({ type: 'ArticleSaved', title, article })
          dispatch({ type: 'SavedPages', pages: RemoteData.Success(pages) })
        })
    }
  },

  removeSavedArticle (title) {
    return (dispatch) => {
      return savedPages.remove(title)
        .then((pages) => {
          dispatch({ type: 'ArticleUnsaved', title })
          dispatch({ type: 'SavedPages', pages: RemoteData.Success(pages) })
        })
    }
  },

  highlightSavedPages (highlighted) {
    return {
      type: 'HighlightSavedPages',
      highlighted
    }
  },

  // Persistent toggles
  loadPersistentToggles () {
    return (dispatch, getState) => {
      return persistentToggles.get()
      .then((toggles) =>
        dispatch({ type: 'SetPersistentToggles', toggles }))
      .catch((e) => console.error(e))
    }
  },

  setPersistentToggle (key, value) {
    return (dispatch, getState) => {
      dispatch({ type: 'SetPersistentToggle', key, value })
      // Persist tokens to storage after a change to survive refreshes
      return persistentToggles.set(getState().persistentToggles)
        .catch((e) => console.error(e))
    }
  }

}
