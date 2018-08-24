import React, { Component } from 'react';
import { Theme as UWPThemeProvider, getTheme } from "react-uwp/Theme";
import ConfigInfo from '../components/ConfigInfo';
import PanelPreview from '../components/PanelPreview';

const containerStyles = { 
  width: '300px',
  height: '500px',
  overflowX: 'hidden',
  overflowY: 'scroll',
  border: 'blue solid 1px',
  position: 'relative',
}

export default class Config extends Component {

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
            <PanelPreview {...this.props} />
          </div>
        </div>
      </UWPThemeProvider>
    );
  }
}

