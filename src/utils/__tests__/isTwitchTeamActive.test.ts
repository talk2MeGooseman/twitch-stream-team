import { isTwitchTeamActive } from '../isTwitchTeamActive'

describe('isTwitchTeamActive', () => {
  it('is active only when a custom team is explicitly inactive', () => {
    expect(isTwitchTeamActive({ customActive: false } as never)).toBe(true)
  })

  it('is not active when the custom team is active', () => {
    expect(isTwitchTeamActive({ customActive: true } as never)).toBe(false)
  })

  it('is not active when customActive is null', () => {
    expect(isTwitchTeamActive({ customActive: null } as never)).toBe(false)
  })

  it('is not active when customActive is missing', () => {
    expect(isTwitchTeamActive({} as never)).toBe(false)
  })
})
