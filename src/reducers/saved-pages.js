import {reducer} from './util'

const initialState = {
  total: 0
}

export default reducer(initialState, {

  TotalSavedPages: (state, { total }) => ({ total }),

  _: state => state

})
