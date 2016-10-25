import React from 'react'
import {Link} from 'react-router'
import Icon, {types} from '../icon'
import flags from '../../flags'
import SavedPagesMenuItem from '../saved-pages-menu-item'

import './menu.css'

const menus = [[

  { label: 'Home', path: '/', icon: types.HOME },
  { label: 'Random', path: '#', icon: types.RANDOM },
  { label: 'Nearby', path: '#', icon: types.NEARBY }

], [

  flags.SAVE_PAGE ? {
    label: <SavedPagesMenuItem />,
    path: '/saved',
    icon: types.SAVEDPAGES
  } : null,

  { label: 'Login', path: '/', icon: types.ANONYMOUS }

].filter((i) => !!i), [

  { label: 'Settings', path: '#', icon: types.SETTINGS }

]]

export default React.createClass({

  render () {
    const {isOpen, onItemClick, onBackdropClick} = this.props
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
            <li><Link to='/about' onClick={onItemClick}>About</Link></li>
            <li><a href='https://en.m.wikipedia.org/wiki/Wikipedia:About'>About Wikipedia</a></li>
            <li><a href='https://en.m.wikipedia.org/wiki/Wikipedia:General_disclaimer'>Disclaimers</a></li>
          </ul>
        </div>
      </div>
    )
  }

})
