import * as articleDB from './db/article'
import * as savedPages from './db/saved-pages'
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
  saveArticle (title, article) {
    savedPages.set(title, article)
    return { type: 'ArticleSaved', title, article }
  },

  removeSavedArticle (title) {
    savedPages.remove(title)
    return { type: 'ArticleUnsaved', title }
  }

}
