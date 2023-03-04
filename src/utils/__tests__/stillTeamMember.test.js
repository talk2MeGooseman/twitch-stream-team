import { stillTeamMember } from '../stillTeamMember'

// jest test for stillTeamMember function
describe('stillTeamMember', () => {
  it('return false if they are no longer part of their selected team', () => {
    expect(stillTeamMember('abc', [{ team_name: '123'}, { team_name: 'bcd'}])).toBeFalsy()
  })

  it('return true if they are still part of their selected team', () => {
    expect(stillTeamMember('abc', [{ team_name: '123'}, { team_name: 'abc'}])).toBeTruthy()
  })

  it('return false if they have no selected team', () => {
    expect(stillTeamMember('', [{ team_name: '123'}, { team_name: 'abc'}])).toBeFalsy()
  })

  it('return false if they have no teams', () => {
    expect(stillTeamMember('abc', [])).toBeFalsy()
  })

  it('return false if they have no teams and no selected team', () => {
    expect(stillTeamMember('', [])).toBeFalsy()
  })

  it('returns false if team is undefined', () => {
    expect(stillTeamMember(null, null)).toBeFalsy()
  })

})
