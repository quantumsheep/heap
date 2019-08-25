import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'normalize.css'

import App from './views/App'
import * as serviceWorker from './serviceWorker'

import * as directory from './softwares/directory'
import * as notepad from './softwares/notepad'
import * as internet from './softwares/internet'

import * as fs from './kernel/filesystem'
fs.init()

if (!fs.get('/home/desktop/notepad.exe')) {
  fs.set('/home/desktop/notepad.exe', {
    type: notepad.info.type,
    icon: notepad.info.icon,
    content: [...`${notepad.info.name}\n${notepad.info.id}`].map(c => c.charCodeAt(0))
  }, true)
}

if (!fs.get('/home/desktop/internet.exe')) {
  fs.set('/home/desktop/internet.exe', {
    type: internet.info.type,
    icon: internet.info.icon,
    content: [...`${internet.info.name}\n${internet.info.id}`].map(c => c.charCodeAt(0))
  }, true)
}

if (!fs.get('/home/desktop/directory.exe')) {
  fs.set('/home/desktop/directory.exe', {
    type: directory.info.type,
    icon: directory.info.icon,
    content: [...`${directory.info.name}\n${directory.info.id}`].map(c => c.charCodeAt(0))
  }, true)
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
