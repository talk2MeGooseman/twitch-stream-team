import { stillTeamMember } from '../stillTeamMember'

// jest test for stillTeamMember function
describe('stillTeamMember', () => {
  it('return false if they are no longer part of their selected team', () => {
    expect(stillTeamMember('abc', [{ team_name: '123'}, { team_name: 'bcd'}])).toBeFalsy()
  })

  it('return true if they are still part of their selected team', () => {
    expect(stillTeamMember('abc', [{ team_name: '123'}, { team_name: 'abc'}])).toBeTruthy()
  })
})
