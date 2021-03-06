import React from 'react'
import '../style/directory.css'

import * as fs from '../kernel/filesystem'

import directory_icon from '../ressources/icons/directory.png'
import folder_icon from '../ressources/icons/directory.png'
import default_icon from '../ressources/icons/default.png'

export const info = {
  id: 'SQyXS3g0CBf0svNM',
  name: 'Directory',
  type: 'program',
  icon: directory_icon,
}

export class Software extends React.Component {
  constructor(props) {
    super(props)

    /** @type {import('../components/HeapOS').default} */
    this.env = this.props.env

    this.state = {
      directory: this.props.directory || '/',

      /** @type {fs.FileSystemItem[]} */
      list: [],
    }
  }

  componentDidMount() {
    this.updateDirectory()
  }

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e 
   */
  changeDirectoryInputState = e => {
    this.setState({ directory: e.currentTarget.value })
  }

  /**
   * @param {string} directory 
   */
  updateDirectory = (directory = this.state.directory) => {
    const files = fs.get(directory)
    this.setState({
      list: files ? files.children : [],
      directory,
    })
  }

  /**
   * @param {React.KeyboardEvent<HTMLInputElement>} e 
   */
  handlePathKeyDown = e => {
    if (e.key === 'Enter') {
      this.updateDirectory()
    }
  }

  render() {
    return (
      <div className="directory">
        <div className="directory-nav">
          <button className="directory-newfolder-btn">New folder</button>
          <input className="directory-path" value={this.state.directory} onChange={this.changeDirectoryInputState} onKeyDown={this.handlePathKeyDown} />
        </div>
        <table className="directory-list">
          <thead>
            <tr>
              <td></td>
              <td>name</td>
            </tr>
          </thead>
          <tbody>
            <tr
              key={`${this.state.directory}/.`}
              className="directory-list-item"
              onClick={() => this.updateDirectory(this.state.directory)}
            >
              <td></td>
              <td>.</td>
            </tr>
            {
              this.state.directory && this.state.directory !== '/'
                ?
                <tr
                  key={`${this.state.directory}/..`}
                  className="directory-list-item"
                  onClick={() => this.updateDirectory(this.state.directory.split('/').slice(0, -1).join('/') || '/')}
                >
                  <td></td>
                  <td>..</td>
                </tr>
                :
                null
            }
            {
              this.state.list.map(item => {
                let icon = item.icon || default_icon

                if (item.type === 'dir') {
                  icon = folder_icon
                }

                return (
                  <tr
                    key={`${item.fullpath}`}
                    className="directory-list-item"
                    onClick={() => {
                      if (item.type === 'dir') {
                        this.updateDirectory(item.fullpath)
                      } else {
                        this.env.openFile(item)
                      }
                    }}
                  >
                    <td>
                      <img src={icon} alt={item.name} className="directory-list-item-icon" />
                    </td>
                    <td>{item.name}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}
