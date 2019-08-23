import React from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

import * as fs from '../utils/filesystem'

import DesktopFiles from '../components/DesktopFiles'
import DesktopIcon from '../components/DesktopIcon'
import WindowManager from '../components/WindowManager'
import HeapWindow from '../components/HeapWindow'

import softwares from '../softwares/list'

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
   * @param {string} icon 
   * @param {string} title 
   * @param {() => Promise<JSX.Element>} body 
   * @param {{ title: string, children: { title: string, onClick: () => void }[] }[]} control 
   * @param {object} size 
   * @param {number} size.width 
   * @param {number} size.height 
   */
  createWindow = async (icon, title, body, control = [], size = {}) => {
    const windows = this.state.windows
    const key = 'window-' + windows.length

    windows.push((
      <HeapWindow icon={icon} title={title} control={control} key={key} dataKey={key} defaultSize={size} onClose={this.closeWindow}>
        {await body()}
      </HeapWindow>
    ))

    this.setState({ windows })
  }

  closeWindow = key => {
    this.setState({
      windows: this.state.windows.filter(component => component.key !== key),
    })
  }

  readme = async () => {
    const { data } = await axios.get(file_readme)

    return (
      <div style={{ padding: '4px' }}>
        <ReactMarkdown source={data} escapeHtml={false} />
      </div>
    )
  }

  /**
   * @param {React.MouseEvent<HTMLElement, MouseEvent>} e 
   * @param {fs.FileSystemItem} item 
   */
  openFile = (e, item) => {
    if (item.type === 'file') {
      console.log(item.content)
    } else if (item.type === 'program') {
      const [title, id] = item.content.map(c => String.fromCharCode(c)).join('').split('\n')

      const Software = softwares[id].Software
      this.createWindow(item.icon, title, () => <Software />, Software.control, Software.defaultSize || {})
    }
  }

  render() {
    const desktop_files = fs.get('/home/desktop')

    return (
      <main>
        <WindowManager>
          {this.state.windows}
        </WindowManager>
        <DesktopFiles>
          {
            Object.keys(desktop_files.children).map(name => {
              const file = desktop_files.children[name]
              return <DesktopIcon key={name} title={name} icon={file.icon} onClick={e => this.openFile(e, file)} />
            })
          }
        </DesktopFiles>
      </main>
    )
  }
}

export default App
