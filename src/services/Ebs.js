import axios from "axios";

const EBS_ROOT_URL = 'https://us-central1-stream-team-3a526.cloudfunctions.net';
// const EBS_ROOT_URL = 'http://localhost:8080/stream-team-3a526/us-central1';

/**
 * getPanelInformation
 *
 * @param {Object} token
 */
export const getPanelInformation = async (token) => {
  let response = await axios({
    method: 'GET',
    url: `${EBS_ROOT_URL}/get_panel_information`,
    headers: {
      'Content-Type': 'application/json',
      'x-extension-jwt': token,
    }
  });

  return response.data;
};

/**
 * configGetPanelInformation
 *
 * @param {Object} token
 */
export const configGetPanelInformation = async (token) => {
  let response = await axios({
    method: 'GET',
    url: `${EBS_ROOT_URL}/config_get_panel_information`,
    headers: {
      'Content-Type': 'application/json',
      'x-extension-jwt': token,
    }
  });

  return response.data;
};

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
      url: `${EBS_ROOT_URL}/set_panel_information`,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'x-extension-jwt': token,
      }
    });
  } catch (error) {
    throw Error(error);
  }

  return response.data;
};

/**
 * setCustomTeam
 *
 * @param {Object} data
 * @param {token} token
 */
export const  setCustomTeamInformation = async (token, data) => {
  let response;
  try {
    response = await axios({
      method: 'POST',
      url: `${EBS_ROOT_URL}/set_custom_team`,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'x-extension-jwt': token,
      }
    });
  } catch (error) {
    throw Error(error);
  }

  return response.data;
};
