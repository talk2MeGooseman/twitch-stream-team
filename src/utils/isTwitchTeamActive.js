import { isNil } from 'ramda'

// Bits 300 rw_grim
// MajorThorn 200 MajorThorn
export const isTwitchTeamActive = ({ customActive }) =>
  !isNil(customActive) && customActive === false
