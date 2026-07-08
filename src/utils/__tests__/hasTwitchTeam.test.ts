import { hasTwitchTeam } from '../hasTwitchTeam'

describe('hasTwitchTeam', () => {
  it('returns true when there is at least one team', () => {
    expect(hasTwitchTeam([{ team_name: 'brainbytes' }] as never)).toBe(true)
  })

  it('returns false for an empty list', () => {
    expect(hasTwitchTeam([])).toBe(false)
  })

  it('returns false for null', () => {
    expect(hasTwitchTeam(null)).toBe(false)
  })

  it('returns false for undefined', () => {
    expect(hasTwitchTeam(undefined)).toBe(false)
  })
})
