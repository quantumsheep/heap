import React from 'react'
import '../style/heap-window.css'

import Draggable, { DraggableCore } from 'react-draggable'

class HeapWindow extends React.Component {
  static defaultProps = {
    title: "Window",
  }

  render() {
    return (
      <Draggable
        handle=".heap-window-title-bar"
        bounds="html"
      >
        <div className="heap-window">
          <div className="heap-window-title-bar">{this.props.title}</div>
          <div>{this.props.children}</div>
        </div>
      </Draggable>
    )
  }
}

export default HeapWindow
