import React from 'react'
import '../style/heap-window.css'

import Draggable from 'react-draggable'

import CloseButton from './CloseButton'

import rand from '../utils/rand'

class HeapWindow extends React.Component {
  static defaultProps = {
    dataKey: null,
    onClose: (e, key) => { },

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
    const OFFSET = 150

    this.setState({
      position: {
        x: (document.body.clientWidth / 2) - (this.reference.current.clientWidth / 2) + (rand(-OFFSET, OFFSET)),
        y: (document.body.clientHeight / 2) - (this.reference.current.clientHeight / 2) + (rand(-OFFSET, OFFSET)),
      },
    })
  }

  onClose = (e, key) => {
    e.preventDefault()
    this.props.onClose(e, key)
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
        handle=".heap-window-title-title"
        bounds="body"
        onStart={this.setOnTop}
        position={this.state.position}
        onDrag={this.onDrag}
      >
        <div ref={this.reference} className="heap-window" style={{ zIndex: this.state.zindex }}>
          <div className="heap-window-title-bar">
            <div className="heap-window-title-title">{this.props.title}</div>
            <div className="heap-window-title-buttons">
              <CloseButton className="heap-window-title-buttons-close" onClick={e => this.onClose(e, this.props.dataKey)} />
            </div>
          </div>
          <div onMouseDown={this.setOnTop}>{this.props.children}</div>
        </div>
      </Draggable>
    )
  }
}

export default HeapWindow
