import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './components/app'
import flags from './flags'
import offline from './offline'

import './styles/index.css'
import './styles/print.css'
import './styles/flashcard-print.css'

// Init DB
import './db'

if (
  process.env.NODE_ENV === 'production' &&
  flags.REGISTER_SW &&
  'serviceWorker' in navigator
) {
  offline((ev) => {
    console.log('SW: ' + ev)
  })
}

ReactDOM.render(
  <Provider store={store()}>
    <App />
  </Provider>,
  document.getElementById('root')
)
