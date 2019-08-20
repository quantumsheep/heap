/**
 * 
 * @param {number} size 
 * @param {number} start 
 */
export default function range(size, start = 0) {
  return [...Array(size).keys()].map(i => i + start)
}
