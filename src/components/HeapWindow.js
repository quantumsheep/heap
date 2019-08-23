import React from 'react'
import '../style/heap-window.css'

import Draggable from 'react-draggable'
import { Resizable } from 're-resizable'
import Hotkeys from 'react-hot-keys'

import CloseButton from './CloseButton'
import HeapWindowControlDropdown from './HeapWindowControlDropdown'
import HeapWindowControlButton from './HeapWindowControlButton'

import rand from '../utils/rand'

import default_icon from '../ressources/icons/default.png'

class HeapWindow extends React.Component {
  static defaultProps = {
    icon: default_icon,

    dataKey: null,
    onClose: key => { },

    title: "Window",
    incrementIndex: () => { },
    getMaxIndex: () => { return 0 },

    defaultSize: {},
    control: [],
  }

  constructor(props) {
    super(props)

    if (!props.icon) {
      props.icon = default_icon
    }

    /** @type {Resizable} */
    this.reference = null;

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
        x: Math.min(document.body.clientWidth, Math.max(0, (document.body.clientWidth / 2) - (this.reference.resizable.clientWidth / 2) + (rand(-OFFSET, OFFSET)))),
        y: Math.min(document.body.clientHeight, Math.max(0, (document.body.clientHeight / 2) - (this.reference.resizable.clientHeight / 2) + (rand(-OFFSET, OFFSET)))),
      },
    })
  }

  close = () => {
    this.props.onClose(this.props.dataKey)
  }

  onDrag = (e, position) => {
    this.setState({ position })
  }

  is_percantage = str => typeof (str) === 'string' && str.endsWith('%')
  get_size_from_percentage = (percantage, parent_size) => parent_size * +percantage.slice(0, -1) / 100

  /**
   * @param {MouseEvent | TouchEvent} e 
   * @param {import('re-resizable').ResizeDirection} dir 
   * @param {HTMLDivElement} ref 
   */
  onResize = (e, dir, ref) => {
    console.log(dir)
    if (dir !== "topLeft" && dir !== "top" && dir !== "left" && dir !== "bottomLeft" && dir !== "topRight") return

    const position = this.state.position

    let { minHeight, maxHeight, minWidth, maxWidth } = this.reference.props

    if (this.is_percantage(minWidth)) {
      minWidth = this.get_size_from_percentage(minWidth, ref.parentElement.clientWidth)
    }

    if (this.is_percantage(maxWidth)) {
      maxWidth = this.get_size_from_percentage(maxWidth, ref.parentElement.clientWidth)
    }

    if (this.is_percantage(minHeight)) {
      minHeight = this.get_size_from_percentage(minHeight, ref.parentElement.clientHeight)
    }

    if (this.is_percantage(maxHeight)) {
      maxHeight = this.get_size_from_percentage(maxHeight, ref.parentElement.clientHeight)
    }

    if ((dir === "topLeft" || dir === "top" || dir === "topRight") && (minHeight === undefined || minHeight <= ref.clientHeight) && (maxHeight === undefined || maxHeight >= ref.clientHeight)) {
      position.y = e.clientY
    }

    if ((dir === "topLeft" || dir === "left" || dir === "bottomLeft") && (minWidth === undefined || minWidth <= ref.clientWidth) && (maxWidth === undefined || maxWidth >= ref.clientWidth)) {
      position.x = e.clientX
    }

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

  /**
   * @param {string} shortcut 
   * @param {KeyboardEvent} e 
   * @param {import('hotkeys-js').HotkeysEvent} handler 
   */
  shortcut = (shortcut, e, handler) => {
    console.log(shortcut, e, handler)
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
        <Resizable
          ref={c => this.reference = c}
          className="heap-window"
          style={{ zIndex: this.state.zindex }}
          onResize={this.onResize}
          defaultSize={this.props.defaultSize}
          minWidth={350}
          minHeight={200}
          maxWidth="100%"
        >
          <Hotkeys
            keyName="w"
            onKeyDown={this.shortcut}
          >
            <div className="heap-window-title-bar">
              <img className="heap-window-title-icon" alt={this.props.title} src={this.props.icon} />
              <div className="heap-window-title-title">{this.props.title}</div>
              <div className="heap-window-title-buttons">
                <CloseButton className="heap-window-title-buttons-close" onClick={e => this.close()} />
              </div>
            </div>
            <div className="heap-window-control">
              {
                this.props.control.map((control, i) => (
                  <HeapWindowControlDropdown key={`control-${i}`} title={control.title}>
                    {
                      control.children.map((child, j) => (
                        <HeapWindowControlButton key={`control-${i}-${j}`} title={child.title} onClick={child.onClick || (() => { })} />
                      ))
                    }
                  </HeapWindowControlDropdown>
                ))
              }
            </div>
            <div onMouseDown={this.setOnTop} className="heap-window-body">{this.props.children}</div>
          </Hotkeys>
        </Resizable>
      </Draggable >
    )
  }
}

export default HeapWindow
