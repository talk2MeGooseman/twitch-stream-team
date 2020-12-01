import axios from "axios";

// const EBS_ROOT_URL = 'https://us-central1-stream-team-3a526.cloudfunctions.net';
const EBS_ROOT_URL = "https://stream-team-app.azurewebsites.net/api";
// const EBS_ROOT_URL = 'http://localhost:7071/api';

/**
 * getPanelInformation
 *
 * @param {Object} token
 */
export const getPanelInformation = async (token) => {
  let response = await axios({
    method: 'GET',
    url: `${EBS_ROOT_URL}/GetDisplayInfo`,
    headers: {
      "Content-Type": "application/json",
      "x-extension-jwt": token,
    },
  });

    return response.data;
}

/**
 * configGetPanelInformation
 *
 * @param {Object} token
 */
export const configGetPanelInformation = async (token) => {
  let response = await axios({
    method: 'GET',
    url: `${EBS_ROOT_URL}/GetSettings`,
    headers: buildHeaders(token),
  });

    return response.data;
}

/**
 * setPanelInformation
 *
 * @param {Object} data
 * @param {token} token
 */
export const setPanelInformation = async (token, data) => {
  let response;
    try {
    response = await axios({
      method: 'POST',
      url: `${EBS_ROOT_URL}/SetTwitchTeam`,
      data: data,
      headers: buildHeaders(token),
    });
    } catch (error) {
    throw Error(error);
    }

  return response.data;
}

/**
 * setCustomTeam
 *
 * @param {Object} data
 * @param {token} token
 */
export const setCustomTeamInformation = async (token, data) => {
  let response;
    try {
    response = await axios({
      method: 'POST',
      url: `${EBS_ROOT_URL}/SetCustomTeam`,
      data: data,
      headers: buildHeaders(token),
    });
    } catch (error) {
    throw Error(error);
    }

  return response.data;
}

function buildHeaders(token) {
  return {
    "Content-Type": "application/json",
    'x-extension-jwt': token,
  }
}
