import React from 'react'
import '../style/heap-window.css'

import Draggable from 'react-draggable'

class HeapWindow extends React.Component {
  static defaultProps = {
    title: "Window",
    incrementIndex: () => { },
    getMaxIndex: () => { return 0 },
  }

  constructor(props) {
    super(props)

    this.reference = React.createRef();

    this.props.incrementIndex()

    this.state = {
      zindex: this.props.getMaxIndex(),
      position: {
        x: 0,
        y: 0,
      }
    }
  }

  componentDidMount() {
    this.setState({
      position: {
        x: (document.body.clientWidth / 2) - (this.reference.current.clientWidth / 2),
        y: (document.body.clientHeight / 2) - (this.reference.current.clientHeight / 2),
      }
    })
  }

  onDrag = (e, position) => {
    this.setState({ position })
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
        bounds="body"
        onStart={this.setOnTop}
        position={this.state.position}
        onDrag={this.onDrag}
      >
        <div ref={this.reference} className="heap-window" style={{ zIndex: this.state.zindex }}>
          <div className="heap-window-title-bar">{this.props.title}</div>
          <div onMouseDown={this.setOnTop}>{this.props.children}</div>
        </div>
      </Draggable>
    )
  }
}

export default HeapWindow
