import { isNil } from 'ramda'
import { useContext, useRef, useState } from 'react'
import { requestChannelsByName } from 'services/TwitchAPI'
import { AuthContext } from 'utils/AuthContext'

export const useFormActions = (
  push: (arg: HelixUser) => void,
  setTeamName: (arg: string) => void
) => {
  const channelTextBoxRef = useRef<HTMLInputElement>(null)
  const teamNameTextBoxRef = useRef<HTMLInputElement>(null)
  const [errorMessages, setErrorMessages] = useState<{ channel?: Maybe<string> }>({
    channel: null,
  })
  const authInfo = useContext(AuthContext)

  const onChannelEnter = async () => {
    if (!channelTextBoxRef.current || !authInfo) {
      return
    }

    const channelName = channelTextBoxRef.current.value

    if (!channelName || channelName.length === 0) {
      return
    }

    try {
      const [channel] = await requestChannelsByName(authInfo.helixToken, [
        channelName.toLowerCase(),
      ])

      if (!isNil(channel)) {
        push(channel)
        channelTextBoxRef.current.value = ''
        setErrorMessages({})
      } else {
        setErrorMessages({
          channel: 'Channel not found, please check your spelling',
        })
      }
    } catch {
      setErrorMessages({
        channel: 'Something went wrong looking up that channel, please try again',
      })
    }
  }

  const onTeamNameChange = () => {
    if (!teamNameTextBoxRef.current) {
      return
    }
    setTeamName(teamNameTextBoxRef.current.value)
  }

  return {
    onTeamNameChange,
    onChannelEnter,
    errorMessages,
    channelTextBoxRef,
    teamNameTextBoxRef,
  }
}
