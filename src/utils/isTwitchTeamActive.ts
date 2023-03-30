import { isNil } from 'ramda'

// Bits 300 rw_grim
// MajorThorn 200 MajorThorn
export const isTwitchTeamActive = ({ customActive }: StreamTeam) =>
  !isNil(customActive) && customActive === false
