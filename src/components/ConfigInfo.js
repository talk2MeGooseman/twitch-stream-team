import React from 'react';
import PropTypes from 'prop-types';
import Separator from "react-uwp/Separator";
import Tabs, { Tab } from "react-uwp/Tabs";
import TwitchTeamFlow from "./TwitchTeamFlow";
import CustomTeamFlow from "./CustomTeamFlow";
import { CUSTOM_TEAM_TYPE } from '../services/constants';

const ConfigInfo = (props, context) => {
  let { store } = props;
  let { theme } = context;
  let focusTabIndex = 0;

  if (!store.twitchTeam.teams || !store.twitchTeam.teams.length || store.teamType === CUSTOM_TEAM_TYPE) {
    focusTabIndex = 1;
  }

  return (
    <div style={{ marginLeft: "30px" }}>
      <h1 style={theme.typographyStyles.header}>Stream Team</h1>
      <Separator />
      <div style={{ marginTop: '5px', marginBottom: '5px', ...theme.typographyStyles.subTitle }}>
        Select if you want to show case your Twitch Team or build a custom team with all your favorite streamers
      </div>
      <Tabs defaultFocusTabIndex={focusTabIndex}>
          <Tab title="Twitch Team Selection">
            <TwitchTeamFlow store={store} />
          </Tab>

          <Tab title="Custom Team Builder">
            <CustomTeamFlow store={store} />
          </Tab>
      </Tabs>
    </div>
  );
};

ConfigInfo.contextTypes = { theme: PropTypes.object };
export default ConfigInfo