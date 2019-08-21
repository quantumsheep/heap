import React from 'react'
import '../style/heap-window.css'

import Draggable, { DraggableCore } from 'react-draggable'

class HeapWindow extends React.Component {
  static defaultProps = {
    title: "Window",
    incrementIndex: () => { },
    getMaxIndex: () => { return 0 },
  }

  constructor(props) {
    super(props)

    this.props.incrementIndex()

    this.state = {
      zindex: this.props.getMaxIndex(),
    }
  }

  setOnTop = () => {
    if (this.state.zindex !== this.props.getMaxIndex()) {
      this.props.incrementIndex()

      this.setState({
        zindex: this.props.getMaxIndex()
      })
    }
  }

  render() {
    return (
      <Draggable
        handle=".heap-window-title-bar"
        bounds="html"
        onStart={this.setOnTop}
      >
        <div className="heap-window" style={{ zIndex: this.state.zindex }}>
          <div className="heap-window-title-bar">{this.props.title}</div>
          <div>{this.props.children}</div>
        </div>
      </Draggable>
    )
  }
}

export default HeapWindow
