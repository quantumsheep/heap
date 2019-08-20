/**
 * 
 * @param {number} min 
 * @param {number} max 
 */
export default function rand(min, max) {
  return Math.random() * (max - min) + min
}
