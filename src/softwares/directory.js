import React from 'react'
import '../style/directory.css'

import directory_icon from '../ressources/icons/directory.png'

export const info = {
  id: 'SQyXS3g0CBf0svNM',
  name: 'Directory',
  type: 'program',
  icon: directory_icon,
}

export class Software extends React.Component {
  render() {
    return (
      <div className="directory">
      </div>
    )
  }
}
