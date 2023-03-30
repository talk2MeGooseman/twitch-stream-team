import { isNil } from 'ramda'
import { useContext,useRef, useState } from 'react'
import type { TextBox } from 'react-uwp'
import { requestChannelsByName } from 'services/TwitchAPI'
import { AuthContext } from 'utils/AuthContext'

export const useFormActions = (push: (arg: HelixUser) => void, setTeamName: (arg: string) => void ) => {
  const channelTextBoxRef = useRef<TextBox>()
  const teamNameTextBoxRef = useRef<TextBox>()
  const [errorMessages, setErrorMessages] = useState<{ channel?: Maybe<string> }>({
    channel: null
  })
  const authInfo = useContext(AuthContext)

  const onChannelEnter = async () => {
    if (!channelTextBoxRef.current || !authInfo) {
      return
    }

    const channelName: string = channelTextBoxRef.current.getValue()

    if (!channelName || channelName.length === 0) {
      return
    }

    const [channel] = await requestChannelsByName(authInfo.helixToken, [channelName.toLowerCase()])

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
    if (!teamNameTextBoxRef.current) {
      return
    }
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
