import { ThemeProvider } from "@material-ui/styles";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/store";
import theme from "./theme";

ReactDOM.render(
  (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider >
    </Provider>
  ),
  document.getElementById("root") as HTMLElement,
);
