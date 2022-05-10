import { createClient } from '@urql/core'
import axios from 'axios'

import {ChannelTeamQuery} from './graphql'

// const EBS_ROOT_URL = 'https://us-central1-stream-team-3a526.cloudfunctions.net';
const EBS_ROOT_URL = 'https://guzman.codes/legacy/stream-teams'
// const EBS_ROOT_URL = 'http://localhost:4000/legacy/stream-teams';


export const initClient = (token) => createClient({
  url: 'https://guzman.codes/api',
  fetchOptions: () => ({
    headers: { 'x-extension-jwt': token },
  }),
})

function buildHeaders(token) {
  return {
    'Content-Type': 'application/json',
    'x-extension-jwt': token,
  }
}

export const getGqlPanelInformation = async (client) => {
  const response = await client
  .query(ChannelTeamQuery, { id: 'test' })
  .toPromise()


  return response.data
}

/**
 * getPanelInformation
 *
 * @param {Object} token
 */
export const getPanelInformation = async (token) => {
  const response = await axios({
    method: 'GET',
    url: `${EBS_ROOT_URL}/GetDisplayInfo`,
    headers: {
      'Content-Type': 'application/json',
      'x-extension-jwt': token,
    },
  })

  return response.data
}

/**
 * configGetPanelInformation
 *
 * @param {Object} token
 */
export const configGetPanelInformation = async (token) => {
  const response = await axios({
    method: 'GET',
    url: `${EBS_ROOT_URL}/GetSettings`,
    headers: buildHeaders(token),
  })

  return response.data
}

/**
 * setPanelInformation
 *
 * @param {Object} data
 * @param {token} token
 */
export const setPanelInformation = async (token, data) => {
  let response
  try {
    response = await axios({
      method: 'POST',
      url: `${EBS_ROOT_URL}/SetTwitchTeam`,
      data,
      headers: buildHeaders(token),
    })
  } catch (error) {
    throw new Error(error)
  }

  return response.data
}

/**
 * setCustomTeam
 *
 * @param {Object} data
 * @param {token} token
 */
export const setCustomTeamInformation = async (token, data) => {
  let response
  try {
    response = await axios({
      method: 'POST',
      url: `${EBS_ROOT_URL}/SetCustomTeam`,
      data,
      headers: buildHeaders(token),
    })
  } catch (error) {
    throw new Error(error)
  }

  return response.data
}
