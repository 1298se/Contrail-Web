import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider >,
 document.getElementById("root")
 );
