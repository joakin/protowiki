import {reducer} from './util'

const initialState = {
  highlightSavedPages: false,
  hasPreviouslySaved: false
}

export default reducer(initialState, {

  HighlightSavedPages: (state, {highlighted}) =>
    ({...state, highlightSavedPages: highlighted}),

  TotalSavedPages: (state, {total}) =>
    // Has previously saved if the total is > 0 at any point
    total > 0 ? ({...state, hasPreviouslySaved: true}) : state,

  _: state => state

})
