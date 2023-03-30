import {
  andThen,
  assoc,
  curry,
  descend,
  pipe,
  pluck,
  prop,
  sort,
} from 'ramda'
import { useContext, useEffect, useState } from 'react'
import { useToggle } from 'react-use'
import { requestLiveChannels } from 'services/TwitchAPI'
import { isLiveChannel } from 'utils'
import { AuthContext } from 'utils/AuthContext'

const updateChannelsLiveStatus = curry((channels: TeamMemberSpecType[], liveChannels: HelixStream[]) =>
  channels.map((channel) => {
    const isLive = liveChannels.find(isLiveChannel(channel))
    return assoc('isLive', isLive, channel)
  })
)

type RefetchLiveChannelsArgs = {
  authInfo: AuthContextType
  team: TeamSpecType
  setChannels: (channels: TeamMemberSpecType[]) => void,
  toggleIsLoading: (isLoading: boolean) => void
}

const refetchLiveChannels = ({ authInfo, team, setChannels, toggleIsLoading }: RefetchLiveChannelsArgs) =>
  pipe<[TeamMemberSpecType[]], string[], Promise<HelixStream[]>, Promise<TeamMemberSpecType[]>, Promise<TeamMemberSpecType[]>, Promise<void>, Promise<void>>(
    pluck('id'),
    requestLiveChannels(authInfo.helixToken),
    andThen(updateChannelsLiveStatus(team.channels)),
    andThen(sort(descend(prop('isLive')))),
    andThen(setChannels),
    andThen(() => toggleIsLoading(false))
  )(team.channels)

export const useLiveStatusFetcher = (team: TeamSpecType) => {
  const [isLoading, toggleIsLoading] = useToggle(true)
  const [channels, setChannels] = useState(team.channels)
  const authInfo = useContext(AuthContext)

  useEffect(() => {
    if (!authInfo?.helixToken) {
      return
    }
    toggleIsLoading(true)

    refetchLiveChannels({ authInfo, team, setChannels, toggleIsLoading })
    const intervalId = setInterval(() => refetchLiveChannels({ authInfo, team, setChannels, toggleIsLoading }), 30_000)

    // eslint-disable-next-line consistent-return
    return () => (clearInterval(intervalId))

  }, [authInfo?.helixToken, team, team.channels, toggleIsLoading])

  return { channels, isLoading }
}
