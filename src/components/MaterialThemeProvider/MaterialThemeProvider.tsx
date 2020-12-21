import { lightBlue } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React from "react";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: lightBlue[50],
    },
  },
});

const MaterialThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default MaterialThemeProvider;
