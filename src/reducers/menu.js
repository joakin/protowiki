import {reducer} from './util'

const initialState = {
  isOpen: false
}

export default reducer(initialState, {

  OpenMenu: (state) => ({...state, isOpen: true}),

  CloseMenu: (state) => ({...state, isOpen: false}),

  _: state => state

})
