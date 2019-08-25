import * as directory from './directory'
import * as internet from './internet'
import * as notepad from './notepad'

export default {
  [internet.info.id]: internet,
  [notepad.info.id]: notepad,
  [directory.info.id]: directory,
}

export const softwares = {
  directory,
  internet,
  notepad,
}
