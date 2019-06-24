import * as React from "react";
import * as ReactDOM from "react-dom";

import { ThemeProvider } from "@material-ui/styles";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { EnthusiasmAction } from "./actions";
import App from "./App";
import { enthusiasm } from "./reducers/index";
import theme from "./theme";
import { StoreState } from "./types/index";

const store = createStore<StoreState, EnthusiasmAction, any, any>(enthusiasm, {
  enthusiasmLevel: 1,
  languageName: "TypeScript",
});

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
