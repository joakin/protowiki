import { Union } from 'results'

const RemoteData = Union({
  NotAsked: {},
  Loading: {},
  Failure: {},
  Success: {}
}, {
  unwrap () {
    return RemoteData.match(this, {
      Success: (data) => data,
      _: () => new Error('No data to unwrap')
    })
  },
  isSuccess () {
    return RemoteData.match(this, {
      Success: () => true,
      _: () => false
    })
  }
})

export default RemoteData
