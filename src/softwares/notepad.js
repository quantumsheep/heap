import React from 'react'
import '../style/notepad.css'
import notepad_icon from '../ressources/icons/notepad.png'

import * as fs from '../kernel/filesystem'

export const info = {
  id: '1uvUMbisLg7pod84',
  name: 'Notepad',
  type: 'program',
  icon: notepad_icon,
}

export class Software extends React.Component {
  static control = [
    {
      title: 'File',
      children: [
        {
          title: 'Save',
          onClick: () => console.log("oui"),
        },
        {
          title: 'New file',
          onClick: () => console.log('Creating new file...'),
        },
      ],
    },
    {
      title: 'Edit',
      children: [
        {
          title: 'Cancel',
          onClick: () => { },
        },
      ],
    },
    {
      title: 'Help',
      children: [
        {
          title: 'How to use',
          onClick: () => { },
        },
        {
          title: 'About',
          onClick: () => { },
        },
      ],
    },
  ]

  constructor(props) {
    super(props)

    /** @type {import('../components/HeapOS').default} */
    this.env = this.props.env

    this.state = {
      content: ''
    }

    if (this.props.target) {
      const target = fs.get(this.props.target)

      if (target.type === 'file') {
        this.state.content = target.content
      }
    }
  }

  render() {
    return (
      <div className="notepad">
        <textarea spellCheck={false} defaultValue={this.state.content}></textarea>
      </div>
    )
  }
}
