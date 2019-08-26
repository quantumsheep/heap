import * as directory from './directory'
import * as internet from './internet'
import * as memory_inspector from './memory-inspector'
import * as notepad from './notepad'

export default {
  [directory.info.id]: directory,
  [internet.info.id]: internet,
  [memory_inspector.info.id]: memory_inspector,
  [notepad.info.id]: notepad,
}

export const softwares = {
  directory,
  internet,
  memory_inspector,
  notepad,
}
