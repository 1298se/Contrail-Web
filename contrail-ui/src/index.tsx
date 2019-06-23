import * as React from "react";
import * as ReactDOM from "react-dom";

import { ThemeProvider } from "@material-ui/styles";
import { Provider } from "react-redux";
import { createStore } from "redux";
import theme from "./theme";
import { EnthusiasmAction } from "./actions";
import { enthusiasm } from "./reducers/index";
import { StoreState } from "./types/index";
import App from "./App";

const store = createStore<StoreState, EnthusiasmAction, any, any>(enthusiasm, {
  enthusiasmLevel: 1,
  languageName: "TypeScript",
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider >,
  </Provider>,
  document.getElementById("root") as HTMLElement,
);
