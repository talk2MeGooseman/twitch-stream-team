import * as React from "react";
import { Theme as UWPThemeProvider, getTheme } from "react-uwp/Theme";
import ListView from "react-uwp/ListView";
const baseStyle = {
  margin: "10px 10px 10px 0",
};

export class App extends React.Component {
  render() {
    return (
      <UWPThemeProvider
        theme={getTheme({
          themeName: "dark", // set custom theme
          accent: "#0078D7", // set accent color
          useFluentDesign: true, // sure you want use new fluent design.
          desktopBackgroundImage:
            'https://static-cdn.jtvnw.net/jtv_user_pictures/team-brainbytes-background_image-4baba38e0e3991c5.png', // set global desktop background image
        })}
      >
        <ListView
          style={baseStyle}
          listSource={Array(15)
            .fill(0)
            .map((numb, index) => index)}
                />
      </UWPThemeProvider>
    );
  }
}

export default App;
