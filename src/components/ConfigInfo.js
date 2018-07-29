import React from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from "react-uwp/DropDownMenu";
import Separator from "react-uwp/Separator";

const baseStyle = {
  margin: "10px 20px 10px 10px",
};

const ConfigInfo = (props, context) => {
  let { store } = props;
  let { theme } = context;

  let onChange = (team) => {
    store.setTeam(team)
    store.name = team;
  }

  let dropdownTeams = Array.from(store.teams || ['No Teams Found']);

  return <div style={{ marginLeft: "30px" }}>
      <h1 style={theme.typographyStyles.header}>Stream Team</h1>
      <Separator />
      <div style={ {marginTop: '5px',...theme.typographyStyles.subTitle} }>If you are already part of a Twitch Team setup in easy!</div>
      <div style={{marginTop: '30px',...theme.typographyStyles.subTitle}}>Instructions:</div>
      <div style={{marginTop: '5px',...theme.typographyStyles.baseAlt}}>
        <ul style={{listStyleType: 'none'}}>
          <li>
            Step 1: Install the extension (which you have already done!)
          </li>
          <li>Step 2: Join a Twitch Team</li>
          <li>Step 3: Select your team (if you have multiple teams) 
            <DropDownMenu
              style={baseStyle}
              values={dropdownTeams}
              defaultValue={store.name}
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
        </ul>
      </div>
    </div>;
};

ConfigInfo.contextTypes = { theme: PropTypes.object };
export default ConfigInfo;