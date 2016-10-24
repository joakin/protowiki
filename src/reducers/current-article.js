import {reducer} from './util'
import RemoteData from '../data/remote-data'
import {Union} from 'results'

const Origin = Union({
  DB: {}, Network: {}, Unknown: {}
}, {
  isSaved () {
    return Origin.match(this, {
      DB: _ => true,
      _: _ => false
    })
  }
})

const initial = {
  title: null,
  data: RemoteData.NotAsked(),
  origin: Origin.Unknown()
}

export default reducer(initial, {

  GetArticle: (state, {title}) =>
    ({ title, data: RemoteData.Loading(), origin: Origin.Unknown() }),

  FromDB: (state, {title, article}) =>
    title === state.title
      ? {title, data: RemoteData.Success(article), origin: Origin.DB()}
      : state,

  FromNetwork: (state, {title, article}) =>
    title === state.title && (
      // No data or
      !state.data.isSuccess() ||
      // Yes data but newer revision, autoupdate
      (state.data.isSuccess() &&
       state.data.unwrap().revision !== article.revision)
    )
      ? {title, data: RemoteData.Success(article), origin: Origin.Network()}
      : state,

  GetArticleFailure: (state, {title, error}) =>
    state.title === title
      ? RemoteData.match(state.data, {
        // There's an good representation of an article being showed, don't
        // show error in the UI because it removes content.
        Success: _ => _,

        // If there's an error and there's no valid article content then
        // then set the error
        _: _ => ({
          title, data: RemoteData.Failure(error), origin: Origin.Unknown()
        })
      })
      : state,

  _: state => state

})
