import { Union } from 'results'

const RemoteData = Union({
  NotAsked: {},
  Loading: {},
  Failure: {},
  Success: {}
}, {
  withDefault (def) {
    return RemoteData.match(this, {
      Success: data => data,
      _: _ => def
    })
  },

  unwrap () {
    return this.withDefault(new Error('No data to unwrap'))
  },

  isSuccess () {
    return RemoteData.match(this, {
      Success: () => true,
      _: () => false
    })
  }
})

export default RemoteData
