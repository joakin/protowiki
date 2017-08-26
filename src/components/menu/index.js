import React from 'react'
import {Link} from 'react-router-dom'
import Icon, {types} from '../icon'
import flags from '../../flags'
import SavedPagesMenuItem from '../saved-pages-menu-item'
import msg, {getCurrentLanguage} from '../../i18n'
import './menu.css'

export default React.createClass({

  render () {
    const {isOpen, onItemClick, onBackdropClick} = this.props

    // Menus defined here so that the messages are updated if the languages
    // change
    const menus = [[

      { label: msg('home'), path: '/' + getCurrentLanguage(), icon: types.HOME },
      { label: msg('random'), path: '#', icon: types.RANDOM },
      { label: msg('nearby'), path: '#', icon: types.NEARBY }

    ], [

      flags.SAVE_PAGE ? {
        label: <SavedPagesMenuItem />,
        path: '/' + getCurrentLanguage() + '/saved',
        icon: types.SAVEDPAGES
      } : null,

      { label: msg('login'), path: '/', icon: types.ANONYMOUS }

    ].filter((i) => !!i), [

      { label: msg('settings'), path: '#', icon: types.SETTINGS }

    ]]

    return (
      <div className={'Menu ' + (isOpen ? 'is-open' : '')}>
        <div className='Menu-backdrop' onClick={onBackdropClick} />
        <div className='Menu-menu'>
          {menus.map((menuItems, i) =>
            <ul key={`menu-${i}`} className='Menu-list'>
              {menuItems.map(({ label, path, icon }) =>
                <li key={label}>
                  <Link className='Menu-item' to={path} onClick={onItemClick}>
                    <Icon type={icon} />
                    {label}
                  </Link>
                </li>
              )}
            </ul>
          )}
          <ul className='Menu-footer-list'>
            <li><Link to='/about' onClick={onItemClick}>{msg('about')}</Link></li>
            <li><a href='https://en.m.wikipedia.org/wiki/Wikipedia:About'>{msg('about_wikipedia')}</a></li>
            <li><a href='https://en.m.wikipedia.org/wiki/Wikipedia:General_disclaimer'>{msg('disclaimers')}</a></li>
          </ul>
        </div>
      </div>
    )
  }

})
