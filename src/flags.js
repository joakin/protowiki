const flags = {
  DOWNLOAD_IN_ACTION_BAR: false,
  REGISTER_SW: false
}

switch (process.env.REACT_APP_PROTOTYPE) {
  case 'autowiki':
    flags.REGISTER_SW = true
  break
  case 'wikilater-1':
    flags.DOWNLOAD_IN_ACTION_BAR = true
  break
}

export default flags
