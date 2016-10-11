const flags = {
  DOWNLOAD_IN_ACTION_BAR: false
}

switch (process.env.REACT_APP_PROTOTYPE) {
  case 'wikilater-1':
    flags.DOWNLOAD_IN_ACTION_BAR = true
}

export default flags
