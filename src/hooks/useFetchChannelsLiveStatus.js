import {
  andThen,
  curry,
  descend,
  pipe,
  prop,
  sort,
} from 'ramda'
import { useEffect, useState } from 'react'
import { useToggle } from 'react-use'
import { requestLiveChannels } from 'services/TwitchAPI'
import { isLiveChannel } from 'utils'

const updateChannelsLiveStatus = curry((channels, liveChannels) =>
  channels.map((channel) => {
    const isLive = liveChannels.find(isLiveChannel(channel))
    if (isLive) {
      channel.isLive = true
    }

    return channel
  })
)

export const useFetchChannelsLiveStatus = (team) => {
  const [isLoading, toggleIsLoading] = useToggle(true)
  const [channels, setChannels] = useState(team.channels)

  useEffect(() => {
    pipe(
      requestLiveChannels,
      andThen(updateChannelsLiveStatus(team.channels)),
      andThen(sort(descend(prop('isLive')))),
      andThen(setChannels),
      andThen(toggleIsLoading)
    )(team.channels)
  }, [team, team.channels, toggleIsLoading])

  return { channels, isLoading }
}
