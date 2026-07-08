import { applyCustomTeamSpec } from 'utils'

describe('applyCustomTeamSpec', () => {
  it('defaults channels to an empty list when there are no members', () => {
    expect(applyCustomTeamSpec({ name: 'test' } as never)).toEqual({
      name: 'test',
      channels: [],
    })
  })

  it('maps custom team members to channels keyed by channel id', () => {
    const customTeam = {
      name: 'My Team',
      teamMembers: [
        { channelId: '1', id: 'a' },
        { channelId: '2', id: 'b' },
      ],
    }

    expect(applyCustomTeamSpec(customTeam as never)).toEqual({
      name: 'My Team',
      channels: [{ id: '1' }, { id: '2' }],
    })
  })
})
