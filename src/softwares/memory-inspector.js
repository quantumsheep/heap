import React from 'react'
import '../style/notepad.css'
import memory_inspector_icon from '../ressources/icons/memory-inspector.png'

import * as fs from '../kernel/filesystem'

import MemoryMap from '../components/MemoryMap'

export const info = {
  id: 'ItR43Q3IX5dquREa',
  name: 'Memory Inspector',
  type: 'program',
  icon: memory_inspector_icon,
}

export class Software extends React.Component {
  static control = []

  constructor(props) {
    super(props)

    /** @type {import('../components/HeapOS').default} */
    this.env = this.props.env

    this.state = {
      target: null,
      buffer: [],
    }

    if (this.props.target) {
      const target = fs.get(this.props.target)

      if (target.type === 'file') {
        if (typeof target.content === 'string') {
          this.state.buffer = [...target.content].map(c => c.charCodeAt(0))
        } else {
          this.state.buffer = target.content
        }
      }
    }
  }

  render() {
    return (
      <MemoryMap buffer={this.state.buffer} />
    )
  }
}
