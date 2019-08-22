import React from 'react'
import '../style/heap-window.css'

class HeapWindowControlDropdown extends React.Component {
  static defaultProps = {
    title: "null"
  }

  constructor(props) {
    super(props)

    this.state = {
      visible: false,
    }
  }

  close = () => {
    document.removeEventListener('click', this.close)
    this.setState({ visible: false })
  }

  /**
   * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} e 
   */
  open = e => {
    e.preventDefault()
    document.addEventListener('click', this.close)
    this.setState({ visible: true })
  }

  render() {
    return (
      <div className="heap-window-control-dropdown">
        <div className="heap-window-control-dropdown-title" onClick={this.open}>{this.props.title}</div>
        <div className="heap-window-control-dropdown-list" style={{ display: this.state.visible ? 'initial' : 'none' }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default HeapWindowControlDropdown
