import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Theme as UWPThemeProvider, getTheme } from "react-uwp/Theme";
import StreamTeams from './StreamTeams';
import ConfigInfo from '../components/ConfigInfo';
import { SAVE_PENDING } from "../services/constants";
import Loader from '../components/Loader';

const containerStyles = { 
  width: '300px',
  height: '500px',
  overflowX: 'hidden',
  overflowY: 'scroll',
  border: 'blue solid 1px',
  position: 'relative',
}

@observer
export default class Config extends Component {

  renderPreview = () => {
    const { store, viewAnchor, viewPlatform } = this.props;

    if (store.saveState === SAVE_PENDING)
    {
      return <Loader />;
    } else
    {
      return <StreamTeams store={store} viewAnchor={viewAnchor} viewPlatform={viewPlatform} />;
    }
  }

  render(){
    const { store } = this.props;

    return(
      <UWPThemeProvider
        style={ {height: '100vh', display: 'flex'} }
        theme={getTheme({
          useFluentDesign: true, // sure you want use new fluent design.
          accent: "#0078D7"
        })}
      >
        <div style={{ flex: 1 }}>
          <ConfigInfo store={store} />
        </div>
        <div style={{ flex: 1}}>
          <h2>Panel Preview</h2>
          <div style={containerStyles}>
            {this.renderPreview()}
          </div>
        </div>
      </UWPThemeProvider>
    );
  }
}

