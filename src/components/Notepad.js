import React from 'react'
import '../style/notepad.css'

class Notepad extends React.Component {
  render() {
    return (
      <div className="notepad">
        <textarea spellCheck={false}></textarea>
      </div>
    )
  }
}

export default Notepad
