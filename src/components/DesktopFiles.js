import React from 'react'
import '../style/desktop-files.css'

class DesktopFiles extends React.Component {
  render() {
    return (
      <div className="desktop-files">
        {this.props.children}
      </div>
    )
  }
}

export default DesktopFiles
