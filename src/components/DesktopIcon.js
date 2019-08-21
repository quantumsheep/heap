import React from 'react'
import '../style/desktop-icon.css'

import default_icon from '../ressources/icons/default.png'

class DesktopIcon extends React.Component {
  static defaultProps = {
    onClick: () => { },

    icon: default_icon,
    title: "???",
  }

  render() {
    return (
      <div className="desktop-icon" onClick={this.props.onClick}>
        <div className="desktop-icon-image" style={{ backgroundImage: `url(${this.props.icon})` }} />
        <div className="desktop-icon-title">{this.props.title}</div>
      </div>
    )
  }
}

export default DesktopIcon
