import React from 'react'
import '../style/desktop-files.css'
import DesktopSelection from './DesktopSelection'

class DesktopFiles extends React.Component {
  render() {
    return (
      <DesktopSelection className="desktop-files">
        {this.props.children}
      </DesktopSelection>
    )
  }
}

export default DesktopFiles
