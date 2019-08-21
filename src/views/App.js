import React from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

import DesktopFiles from '../components/DesktopFiles'
import DesktopIcon from '../components/DesktopIcon'
import WindowManager from '../components/WindowManager'
import HeapWindow from '../components/HeapWindow'

import internet_icon from '../ressources/icons/internet.png'
import textfile_icon from '../ressources/icons/textfile.png'

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
   */
  createWindow = async (title, body) => {
    const windows = this.state.windows
    const key = 'window-' + windows.length

    windows.push((
      <HeapWindow title={title} key={key} dataKey={key} onClose={this.closeWindow}>
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

  render() {
    return (
      <main>
        <WindowManager>
          {this.state.windows}
        </WindowManager>
        <DesktopFiles>
          <DesktopIcon icon={internet_icon} title="Internet" onClick={() => this.createWindow("Internet", this.internet)} />
          <DesktopIcon icon={textfile_icon} title="README" onClick={() => this.createWindow("README", this.readme)} />
        </DesktopFiles>
      </main>
    )
  }
}

export default App
