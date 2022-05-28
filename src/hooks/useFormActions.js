import { isNil } from 'ramda'
import { useRef, useState } from 'react'
import { requestChannelsByName } from 'services/TwitchAPI'

export const useFormActions = (push, setTeamName) => {
  const channelTextBoxRef = useRef()
  const teamNameTextBoxRef = useRef()
  const [errorMessages, setErrorMessages] = useState({})

  const onChannelEnter = async () => {
    const channelName = channelTextBoxRef.current.getValue()

    if (!channelName || channelName.length === 0) {
      return
    }

    const [channel] = await requestChannelsByName([channelName])

    if (!isNil(channel)) {
      push(channel)
      channelTextBoxRef.current.setValue('')
      setErrorMessages({})
    } else {
      setErrorMessages({
        channel: 'Channel not found, please check your spelling',
      })
    }
  }

  const onTeamNameChange = () => {
    setTeamName(teamNameTextBoxRef.current.getValue())
  }

  return {
    onTeamNameChange,
    onChannelEnter,
    errorMessages,
    channelTextBoxRef,
    teamNameTextBoxRef,
  }
}
