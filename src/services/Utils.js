/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-plusplus */
/* eslint-disable unicorn/prefer-math-trunc */
/* eslint-disable no-shadow */
/* eslint-disable no-bitwise */

export function uuid() {
  let i; let random
  let uuid = ''

  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-'
    }
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16)
  }

  return uuid
}
