import React from 'react'
import '../style/heap-os.css'

import * as fs from '../kernel/filesystem'
import register from '../kernel/register'

import DesktopFiles from './DesktopFiles'
import DesktopIcon from './DesktopIcon'
import WindowManager from './WindowManager'
import HeapWindow from './HeapWindow'

import softwares from '../softwares/list'

import * as core from '../kernel/core'

class HeapOS extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      /** @type {HeapWindow[]} */
      windows: [],
    }

    core.init()
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

  /**
   * @param {fs.FileSystemItem} item 
   * @param {string} target 
   */
  openFile = (item, target = null) => {
    const extension = item.name.slice((item.name.lastIndexOf(".") - 1 >>> 0) + 2)

    if (extension === 'exe') {
      const [title, id] = item.content.map(c => String.fromCharCode(c)).join('').split('\n')

      const Software = softwares[id].Software
      this.createWindow(item.icon, title, () => <Software env={this} />, Software.control, Software.defaultSize || {})
    } else if (extension === 'ln') {
      return this.openFile(fs.get(item.content), target)
    } else {
      const association = register.file_association[extension]

      if (!association) {
        return
      }

      const software = fs.get(association)

      if (!software) {
        return
      }

      const [title, id] = software.content.map(c => String.fromCharCode(c)).join('').split('\n')

      const Software = softwares[id].Software
      this.createWindow(item.icon, title, () => <Software env={this} target={item.fullpath} />, Software.control, Software.defaultSize || {})
    }
  }

  render() {
    const desktop_files = fs.get('/home/desktop')

    return (
      <div className="heap-os">
        <WindowManager>
          {this.state.windows}
        </WindowManager>
        <DesktopFiles>
          {
            desktop_files.children.map(file => {
              return <DesktopIcon key={file.name} title={file.name} icon={file.icon} onClick={e => this.openFile(file)} />
            })
          }
        </DesktopFiles>
      </div>
    )
  }
}

export default HeapOS
