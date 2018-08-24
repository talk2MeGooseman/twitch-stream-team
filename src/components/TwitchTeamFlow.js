import React from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from "react-uwp/DropDownMenu";
import Button from "react-uwp/Button";
import { CUSTOM_TEAM_TYPE } from "../services/constants";
import { observer } from "mobx-react";

const baseStyle = {
  margin: "10px 20px 10px 10px",
};

const marginStyle = {
  margin: "10px 0"
};

const TwitchTeamFlow = (props, context) => {
  let { store } = props;
  let { twitchTeam } = store;
  let { theme } = context;

  let onChange = (team) => {
    twitchTeam.setTeam(team)
    twitchTeam.name = team;
  }

  let onSetTwitchTeam = () => {
    twitchTeam.setTeam(twitchTeam.name)
  }

  let dropdownTeams = ['No Teams Found'];
  if ( twitchTeam.teams && twitchTeam.teams.length > 0 ) {
    dropdownTeams = Array.from(twitchTeam.teams);
  }

  let disableSetTeamButton = store.teamType !== CUSTOM_TEAM_TYPE;

  return (
    <React.Fragment>
      <div style={{ marginTop: '5px', ...theme.typographyStyles.subTitle }}>If you are already part of a Twitch Team setup is easy!</div>
      <div style={{ marginTop: '30px', ...theme.typographyStyles.subTitle }}>Instructions:</div>
      <div style={{ marginTop: '5px', ...theme.typographyStyles.baseAlt }}>
        <ul style={{ listStyleType: 'none' }}>
          <li>
            Step 1: Install the extension (which you have already done!)
          </li>
          <li>Step 2: Join a Twitch Team</li>
          <li>Step 3: Select your team (if you have multiple teams);
            <DropDownMenu
              style={baseStyle}
              values={dropdownTeams}
              defaultValue={twitchTeam.name}
              onChangeValue={onChange}
              background={"black"}
              itemWidth={200}
            />
          </li>
          <li>Step 4: Look at the preview to see how your team looks.</li>
          <li>
            Step 5: Activate the extension in panel 1, 2 or 3 <strong>
              <a href="https://www.twitch.tv/talk2megooseman/dashboard/extensions/manage" target="_blank" rel="noopener noreferrer">
                here
              </a>
            </strong>
          </li>
          <li>Step 6: Tell your chat about the extension!</li>
          <li>
            Step 7: Display your Twitch Team in the panel
            <br />
            <Button style={marginStyle} onClick={onSetTwitchTeam} background={theme.accent} disabled={disableSetTeamButton}>
              Set your Twitch Team as your Panel Team
            </Button>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

TwitchTeamFlow.contextTypes = { theme: PropTypes.object };
export default observer(TwitchTeamFlow);