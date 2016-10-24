import {reducer} from './util'

const online = true

export default reducer(online, {

  Online: _ => true,

  Offline: _ => false,

  _: state => state

})
