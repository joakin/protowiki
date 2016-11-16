import {reducer} from './util'

// Persistent toggles that are saved to the DB and restored on page load

const initialState = {
  hasSeenSavedPagesInfo: false
}

export default reducer(initialState, {

  SetPersistentToggle: (state, {key, value}) => ({ ...state, [key]: value }),

  SetPersistentToggles: (state, {toggles}) =>
    // Load the toggles that actually exist in the source state, discard old
    // stored ones that are not in the code any more.
    Object.keys(toggles).reduce((st, key) =>
      key in st
        ? { ...st, [key]: toggles[key] }
        : st
    , state),

  _: state => state

})
