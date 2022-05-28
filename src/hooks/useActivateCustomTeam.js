import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { ActivateCustomTeamMutation, ChannelTeamQuery } from 'services/graphql'

export const useActivateCustomTeam = () => {
  const [activateMutation] = useMutation(ActivateCustomTeamMutation, {
    refetchQueries: [ChannelTeamQuery],
  })

  return [
    useCallback(() => {
      activateMutation({
        variables: {
          activate: true,
        },
      })
    }, [activateMutation]),
  ]
}
