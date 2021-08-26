import Icon from '@asany/icons';
import React from 'react';

function Navigation() {
  return (
    <div className="ie-navigation">
      <div className="navigation-left">
        <Icon name="ToolbarBack" className="back-icon toolbar-icon" />
        <span className="title">ASANY </span>
      </div>
      <div className="ie-navigation-container">
        <div className="ie-search">
          <div className="ie-icon-typs">
            <select>
              <option>Images</option>
            </select>
          </div>
          <div className="ie-icon-input">
            <input placeholder="Search" />
          </div>
        </div>
      </div>
      <div className="ie-my-libraries">
        <a className="button-text">My Libraries</a>
      </div>
    </div>
  );
}

export default Navigation;
