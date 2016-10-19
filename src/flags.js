const flags = {
  DOWNLOAD_IN_ACTION_BAR: false,
  REGISTER_SW: false,
  ONLINE_STATUS_BAR: false,
  SAVE_PAGE: false,
  DOWNLOAD_SUMMARY: false
}

switch (process.env.REACT_APP_PROTOTYPE) {
  case 'flashcard-1':
    flags.DOWNLOAD_SUMMARY = true
    break
  case 'autowiki':
    flags.REGISTER_SW = true
    flags.ONLINE_STATUS_BAR = true
    flags.SAVE_PAGE = true
    break
  case 'wikilater-1':
    flags.DOWNLOAD_IN_ACTION_BAR = true
    break
  default:
    // nothing enabled
}

export default flags
