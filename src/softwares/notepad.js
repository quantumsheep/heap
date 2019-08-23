import React from 'react'
import '../style/notepad.css'
import notepad_icon from '../ressources/icons/notepad.png'

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

  render() {
    return (
      <div className="notepad">
        <textarea spellCheck={false}></textarea>
      </div>
    )
  }
}
