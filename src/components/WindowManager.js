import React from 'react'

class WindowManager extends React.Component {
  constructor(props) {
    super(props)

    this.index = 0
  }

  incrementIndex = () => {
    this.index++
  }

  getMaxIndex = () => this.index

  render() {
    return (
      <div>
        {React.Children.map(this.props.children, child => React.cloneElement(child, {
          incrementIndex: this.incrementIndex,
          getMaxIndex: this.getMaxIndex,
        }))}
      </div>
    )
  }
}

export default WindowManager
