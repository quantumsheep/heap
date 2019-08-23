import default_fs from '../files/default-disk.json'
import default_icon from '../ressources/icons/default.png'

/**
 * @typedef {object} FileSystemItem 
 * @property {string} name 
 * @property {string} type 
 * @property {string} icon 
 * @property {string} fullpath 
 * @property {string|number[]=} content  
 * @property {{[key: string]: FileSystemItem}=} children 
 */

/** @type {FileSystemItem} */
export let tree = {}

export function save() {
  localStorage.setItem('filesystem', new Buffer(JSON.stringify(tree)).toString('base64'))
}

/**
 * @param {FileSystemItem} cd 
 * @param {string} actual 
 */
function map_paths(cd, actual = '') {
  cd.fullpath = actual

  if (cd.type === 'dir') {
    // eslint-disable-next-line
    for (let i in cd.children) {
      map_paths(cd.children[i], `${actual}/${i}`)
    }
  }
}

export function init() {
  const stored = localStorage.getItem('filesystem')

  if (stored) {
    tree = JSON.parse(atob(stored))
  } else {
    tree = default_fs
  }

  map_paths(tree)
  save()
}

/**
 * @param {string} path Must always be absolute 
 * @param {boolean} last Return last found path if it fail 
 * @returns {FileSystemItem | null}
 */
export function get(path, last = false) {
  const parts = path.split('/')
  const removed = parts.splice(0, 1)

  let cd = tree

  if (removed[0] === '/') {
    cd = cd.children
  }

  // eslint-disable-next-line
  for (const part of parts) {
    if (cd.children[part]) {
      cd = cd.children[part]
    } else {
      return last ? cd : null
    }
  }

  return cd
}

/**
 * @param {string} path Must always be absolute 
 * @param {boolean} parents Recursively create directory 
 * @returns {string} 
 */
export function mkdir(path, parents = false) {
  const parts = path.split('/')

  let actual = get(path, true)

  if (actual.type === "file") {
    return `${actual} is a file`
  }

  const actual_parts = actual.fullpath.split('/')

  if (actual_parts.length === parts.length) {
    return `${path} already exists`
  }

  if (!parents && (actual_parts.length + 1) < parts.length) {
    return `${parts.slice(0, actual_parts.length + 1).join('/')}: path not found`
  }

  let i = actual_parts.length
  do {
    const dir = parts[i]

    actual.children[dir] = {
      type: 'dir',
      fullpath: `${actual.fullpath}/${dir}`,
      children: {},
    }

    actual = actual.children[dir]
    i++
  } while (parents && i < parts.length)

  save()

  return null
}

/**
 * 
 * @param {string} path Must always be absolute 
 * @param {object} config 
 * @param {string=} config.type 
 * @param {string=} config.icon 
 * @param {string=} config.content 
 * @param {boolean} parents Recursively create directory 
 * @param {string} type 
 * @returns {string} 
 */
export function set(path, config = {}, parents = false) {
  const parts = path.split('/')
  const [file] = parts.splice(-1, 1)

  const file_directory = parts.join('/')

  if (parents) {
    // eslint-disable-next-line
    const err = mkdir(file_directory, true)
  }

  const cd = get(file_directory)

  if (!cd) {
    return `Path not found: ${file_directory}`
  }

  cd.children[file] = {
    name: file,
    fullpath: `${file_directory}/${file}`,
    type: 'file',
    icon: default_icon,
    content: '',
    ...config,
  }

  save()

  return null
}
