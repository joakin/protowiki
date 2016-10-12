
export default function init (emit) {
  // Initialize service worker if available
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then((reg) => {
      // registration worked
      console.log('ServiceWorker: Registration succeeded. Scope is ' + reg.scope)
      reg.addEventListener('updatefound', () => onUpdateFound(reg, emit))
    }).catch((error) =>
      // registration failed
      console.log('ServiceWorker: Registration failed with ' + error)
    )
  }
}

function onUpdateFound (registration, emit) {
  let newWorker = registration.installing

  registration.installing.addEventListener('statechange',
    () => onStateChange(newWorker, emit))
}

function onStateChange (newWorker, emit) {
  if (newWorker.state === 'activated') {
    emit('activated')
    if (navigator.serviceWorker.controller) {
      emit('claimed')
    }
  } else if (
    newWorker.state === 'installed' &&
    navigator.serviceWorker.controller
  ) {
    emit('installed')
  }
}
