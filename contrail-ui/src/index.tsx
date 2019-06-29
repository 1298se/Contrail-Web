import { ThemeProvider } from "@material-ui/styles";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./App";
import rootReducer from "./store/reducers/rootReducer";
import theme from "./theme";
import { initializeFirebase } from "./utils/auth-utils";

const store = createStore(rootReducer);
initializeFirebase();

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
