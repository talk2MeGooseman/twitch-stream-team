import { applyCustomTeamSpec } from 'utils'

it('add', () => {
  expect(applyCustomTeamSpec({
    name: 'test'
  })).toEqual({
    name: 'test',
    channels: []
  })
})
