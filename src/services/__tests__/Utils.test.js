import { uuid } from '../Utils'

describe('uuid', () => {
  it('generates a 36 character v4-style uuid', () => {
    expect(uuid()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    )
  })

  it('generates a different value on each call', () => {
    const values = new Set(Array.from({ length: 100 }, () => uuid()))
    expect(values.size).toBe(100)
  })
})
