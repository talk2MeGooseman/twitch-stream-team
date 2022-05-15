import { andThen, descend, pipe, prop, sort } from 'ramda'
import { useEffect, useState } from 'react'
import { useToggle } from 'react-use'
import { requestLiveChannels } from 'services/TwitchAPI'

const updateChannelLiveStatus = (team) => (liveChannels) => {
  const updatedChannels = [...team.channels]

  liveChannels.forEach((liveChannel) => {
    const channel = updatedChannels.find(
      (foundChannel) => foundChannel.id === liveChannel.user_id
    )
    if (channel) {
      channel.isLive = true
    }
  })

  return updatedChannels
}

export const useFetchChannelsLiveStatus = (team) => {
  const [isLoading, toggleIsLoading] = useToggle(true)
  const [channels, setChannels] = useState(team.channels)

  useEffect(() => {
    pipe(
      requestLiveChannels,
      andThen(updateChannelLiveStatus(team)),
      andThen(sort(descend(prop('isLive')))),
      andThen(setChannels),
      andThen(toggleIsLoading)
    )(team.channels)
  }, [team, team.channels, toggleIsLoading])

  return { channels, isLoading }
}
