import React from 'react';
import {Link} from 'react-router';
import Icon, {types} from '../icon';

import './menu.css'

const menuItems = [
  { label: 'Home', path: '/', icon: types.HOME }
]

export default React.createClass({

  render () {
    const {isOpen, onItemClick, onBackdropClick} = this.props
    return (
      <div className={'Menu ' + (isOpen ? 'is-open' : '')}>
        <div className='Menu-backdrop' onClick={onBackdropClick} />
        <div className='Menu-menu'>
          <ul className='Menu-list'>
            {menuItems.map(({ label, path, icon }) =>
              <li key={label}>
                <Link className='Menu-item' to={path} onClick={onItemClick}>
                  <Icon type={icon} />
                  {label}
                </Link>
              </li>
            )}
          </ul>
          <ul className='Menu-footer-list'>
            <li><Link to='/about' onClick={onItemClick}>About</Link></li>
            <li><a href='https://en.m.wikipedia.org/wiki/Wikipedia:About'>About Wikipedia</a></li>
            <li><a href='https://en.m.wikipedia.org/wiki/Wikipedia:General_disclaimer'>Disclaimers</a></li>
          </ul>
        </div>
      </div>
    );
  }

});
