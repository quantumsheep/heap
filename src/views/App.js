import React from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

import DesktopFiles from '../components/DesktopFiles'
import DesktopIcon from '../components/DesktopIcon'
import WindowManager from '../components/WindowManager'
import HeapWindow from '../components/HeapWindow'
import Notepad from '../components/Notepad'
import Directory from '../components/Directory'

import internet_icon from '../ressources/icons/internet.png'
import textfile_icon from '../ressources/icons/textfile.png'
import directory_icon from '../ressources/icons/directory.png'
import notepad_icon from '../ressources/icons/notepad.png'

import file_readme from '../files/README.md'

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
   * @param {() => Promise<JSX.Element>} body 
   * @param {object} size 
   * @param {number} size.width 
   * @param {number} size.height 
   */
  createWindow = async (title, body, size = {}) => {
    const windows = this.state.windows
    const key = 'window-' + windows.length

    windows.push((
      <HeapWindow title={title} key={key} dataKey={key} defaultSize={size} onClose={this.closeWindow}>
        {await body()}
      </HeapWindow>
    ))

    this.setState({ windows })
  }

  closeWindow = (e, key) => {
    this.setState({
      windows: this.state.windows.filter(component => component.key !== key),
    })
  }

  internet = async () => (
    <div style={{ padding: '4px' }}>Welcome to the World Wide Web!</div>
  )

  readme = async () => {
    const { data } = await axios.get(file_readme)

    return (
      <div style={{ padding: '4px' }}>
        <ReactMarkdown source={data} escapeHtml={false} />
      </div>
    )
  }

  notepad = async () => {
    return <Notepad></Notepad>
  }

  directory = async () => {
    return <Directory></Directory>
  }

  render() {
    return (
      <main>
        <WindowManager>
          {this.state.windows}
        </WindowManager>
        <DesktopFiles>
          <DesktopIcon icon={internet_icon} title="Internet" onClick={() => this.createWindow("Internet", this.internet)} />
          <DesktopIcon icon={textfile_icon} title="README" onClick={() => this.createWindow("README", this.readme, { width: 500, height: 600 })} />
          <DesktopIcon icon={notepad_icon} title="Notepad" onClick={() => this.createWindow("Notepad", this.notepad)} />
          <DesktopIcon icon={directory_icon} title="Directory" onClick={() => this.createWindow("Directory", this.directory)} />
        </DesktopFiles>
      </main>
    )
  }
}

export default App
