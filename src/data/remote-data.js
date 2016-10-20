import { Union } from 'results'

const RemoteData = Union({
  NotAsked: {},
  Loading: {},
  Failure: {},
  Success: {}
})

export default RemoteData
