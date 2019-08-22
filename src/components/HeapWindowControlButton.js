import React from 'react'
import '../style/heap-window.css'

class HeapWindowControlButton extends React.Component {
  static defaultProps = {
    title: "null"
  }

  render() {
    const { className, title, ...others } = this.props

    return (
      <div className="heap-window-control-button" {...others}>
        <div>{title}</div>
      </div>
    )
  }
}

export default HeapWindowControlButton
