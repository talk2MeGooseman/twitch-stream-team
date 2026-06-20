import { descend, prop, sort } from 'ramda'
import { useContext, useEffect, useState } from 'react'
import { requestLiveChannels } from 'services/TwitchAPI'
import { isLiveChannel } from 'utils'
import { AuthContext } from 'utils/AuthContext'

type RefetchLiveChannelsArgs = {
  authInfo: AuthContextType
  team: TeamSpecType
  setChannels: (channels: TeamMemberSpecType[]) => void
  setIsLoading: (isLoading: boolean) => void
}

const refetchLiveChannels = async ({
  authInfo,
  team,
  setChannels,
  setIsLoading,
}: RefetchLiveChannelsArgs) => {
  const channelIds = team.channels.map((channel) => channel.id)
  const liveChannels = await requestLiveChannels(authInfo.helixToken, channelIds)

  const withLiveStatus = team.channels.map((channel) => ({
    ...channel,
    isLive: liveChannels.some((live) => isLiveChannel(channel, live)),
  }))

  // Show live channels first.
  setChannels(sort(descend(prop('isLive')), withLiveStatus))
  setIsLoading(false)
}

export const useLiveStatusFetcher = (team: TeamSpecType) => {
  const [isLoading, setIsLoading] = useState(true)
  const [channels, setChannels] = useState(team.channels)
  const authInfo = useContext(AuthContext)

  useEffect(() => {
    if (!authInfo?.helixToken) {
      return undefined
    }
    setIsLoading(true)

    refetchLiveChannels({ authInfo, team, setChannels, setIsLoading })
    const intervalId = setInterval(
      () => refetchLiveChannels({ authInfo, team, setChannels, setIsLoading }),
      30_000
    )

    return () => clearInterval(intervalId)
  }, [authInfo?.helixToken, team, team.channels])

  return { channels, isLoading }
}
