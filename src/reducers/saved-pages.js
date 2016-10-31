import {reducer} from './util'
import RemoteData from '../data/remote-data'

const initialState = {
  pages: RemoteData.NotAsked(),
  total: 0
}

export default reducer(initialState, {

  SavedPages: (state, { pages }) => ({ ...state, pages }),

  _: state => state

})
