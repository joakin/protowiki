import {reducer} from './util'

const online = 'onLine' in window.navigator ? window.navigator.onLine : true

export default reducer(online, {

  Online: _ => true,

  Offline: _ => false,

  _: state => state

})
