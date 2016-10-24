
export function reducer (initial, map) {
  return function (state = initial, action) {
    return action.type in map
      ? map[action.type](state, action)
      : '_' in map
      ? map['_'](state, action)
      : process.env.NODE_ENV !== 'production'
      ? console.error('Couldn\'t match action', action, 'against', map)
      : null
  }
}
