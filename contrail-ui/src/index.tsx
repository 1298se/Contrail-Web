import * as React from "react";
import * as ReactDOM from "react-dom";

import { ThemeProvider } from "@material-ui/styles";
import App from "./App";
import theme from "./theme";
import { initializeFirebase } from "./utils/auth-utils";

initializeFirebase();

ReactDOM.render(
  (
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider >
  ),
  document.getElementById("root") as HTMLElement,
);
