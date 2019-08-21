import React from 'react'

import DesktopFiles from '../components/DesktopFiles'
import DesktopIcon from '../components/DesktopIcon'
import WindowManager from '../components/WindowManager'
import HeapWindow from '../components/HeapWindow'

import internet_icon from '../ressources/icons/internet.png'
import textfile_icon from '../ressources/icons/textfile.png'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      /** @type {HeapWindow[]} */
      windows: [],
    }
  }

  /**
   * @param {string} title 
   * @param {JSX.Element} body 
   */
  createWindow = (title, body) => {
    const windows = this.state.windows
    const key = 'window-' + windows.length

    windows.push((
      <HeapWindow title={title} key={key} dataKey={key} onClose={this.closeWindow}>
        {body}
      </HeapWindow>
    ))

    this.setState({ windows })
  }

  closeWindow = (e, key) => {
    this.setState({
      windows: this.state.windows.filter(component => component.key !== key),
    })
  }

  openInternet = () => this.createWindow('Internet', (
    <div>Welcome, this is the readme file!</div>
  ))

  render() {
    return (
      <main>
        <DesktopFiles>
          <DesktopIcon icon={internet_icon} title="Internet" onClick={this.openInternet} />
          <DesktopIcon icon={textfile_icon} title="README" />
        </DesktopFiles>
        <WindowManager>
          {this.state.windows}
        </WindowManager>
      </main>
    )
  }
}

export default App
