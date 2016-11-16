import {reducer} from './util'
import RemoteData from '../data/remote-data'

const initialState = {
  pages: RemoteData.NotAsked()
}

export default reducer(initialState, {

  SavedPages: (state, { pages }) => ({ ...state, pages }),

  _: state => state

})
