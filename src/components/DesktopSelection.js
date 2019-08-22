import React from 'react'
import '../style/desktop-selection.css'

class DesktopSelection extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      position: {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
      },
      capturing: 0,
    }

    this.mouseMoveEvent = null;
  }

  /**
   * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} e
   */
  startCapture = e => {
    e.preventDefault()

    document.addEventListener('mousemove', this.onMouseMove)

    this.setState({
      capturing: 1,
    })
  }

  /**
   * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} e
   */
  stopCapture = e => {
    e.preventDefault()

    document.removeEventListener('mousemove', this.onMouseMove)

    this.setState({
      capturing: false,
      position: {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
      },
    })
  }

  /**
   * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} e
   */
  onMouseMove = e => {
    if (this.state.capturing === 1) {
      const position = this.state.position

      position.startX = e.pageX
      position.startY = e.pageY
      position.endX = position.startX
      position.endY = position.startY

      this.setState({
        position,
        capturing: 2,
      })
    } else if (this.state.capturing === 2) {
      const position = this.state.position

      position.endX = e.pageX
      position.endY = e.pageY

      this.setState({ position })
    }
  }

  render() {
    const { ...others } = this.props

    const dimensions = {
      left: this.state.position.startX,
      top: this.state.position.startY,
      width: this.state.position.endX,
      height: this.state.position.endY,
    }

    if (this.state.position.endX > this.state.position.startX) {
      dimensions.width -= this.state.position.startX
    } else {
      dimensions.left = this.state.position.endX
      dimensions.width = this.state.position.startX - this.state.position.endX
    }

    if (this.state.position.endY > this.state.position.startY) {
      dimensions.height -= this.state.position.startY
    } else {
      dimensions.top = this.state.position.endY
      dimensions.height = this.state.position.startY - this.state.position.endY
    }

    return (
      <div {...others} style={{ height: '100%' }} onMouseDown={this.startCapture} onMouseUp={this.stopCapture}>
        {this.props.children}
        <div
          className="desktop-selection"
          style={
            {
              display: this.state.capturing === 2 ? '' : 'none',
              ...dimensions,
            }
          }
        ></div>
      </div>
    )
  }
}

export default DesktopSelection
