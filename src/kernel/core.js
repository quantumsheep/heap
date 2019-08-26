import * as directory from '../softwares/directory'
import * as memory_inspector from '../softwares/memory-inspector'
import * as notepad from '../softwares/notepad'
import * as internet from '../softwares/internet'

import * as fs from './filesystem'

export function init() {
  fs.init()

  fs.set('/bin/notepad.exe', {
    type: notepad.info.type,
    icon: notepad.info.icon,
    content: [...`${notepad.info.name}\n${notepad.info.id}`].map(c => c.charCodeAt(0))
  }, true)

  fs.set('/home/desktop/notepad.ln', {
    type: 'symlink',
    icon: notepad.info.icon,
    content: '/bin/notepad.exe'
  }, true)

  fs.set('/bin/internet.exe', {
    type: internet.info.type,
    icon: internet.info.icon,
    content: [...`${internet.info.name}\n${internet.info.id}`].map(c => c.charCodeAt(0))
  }, true)

  fs.set('/home/desktop/internet.ln', {
    type: 'symlink',
    icon: internet.info.icon,
    content: '/bin/internet.exe'
  }, true)

  fs.set('/bin/directory.exe', {
    type: directory.info.type,
    icon: directory.info.icon,
    content: [...`${directory.info.name}\n${directory.info.id}`].map(c => c.charCodeAt(0))
  }, true)

  fs.set('/home/desktop/directory.ln', {
    type: 'symlink',
    icon: directory.info.icon,
    content: '/bin/directory.exe'
  }, true)

  fs.set('/bin/memory-inspector.exe', {
    type: memory_inspector.info.type,
    icon: memory_inspector.info.icon,
    content: [...`${memory_inspector.info.name}\n${memory_inspector.info.id}`].map(c => c.charCodeAt(0))
  }, true)
}
