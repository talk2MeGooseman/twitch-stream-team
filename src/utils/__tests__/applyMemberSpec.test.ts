import { applyMemberSpec } from '../applyMemberSpec'

describe('applyMemberSpec', () => {
  it('maps a Helix user into a team member spec', () => {
    const helixUser = {
      id: '123',
      display_name: 'Talk2MeGooseman',
      profile_image_url: 'https://images/profile.png',
      description: 'A streamer',
      // extra fields that should be dropped
      login: 'talk2megooseman',
      email: 'nope@example.com',
    }

    expect(applyMemberSpec(helixUser)).toEqual({
      id: '123',
      name: 'Talk2MeGooseman',
      profileImage: 'https://images/profile.png',
      description: 'A streamer',
      isLive: false,
    })
  })

  it('always defaults isLive to false', () => {
    expect(applyMemberSpec({ id: '1' }).isLive).toBe(false)
  })
})
