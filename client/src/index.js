import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  palette: {
    type: "light"
    //primary: green
  },
  overrides: {
    MuiButton: {
      root: {
        background: "#12a300",
        color: "white",
        margin: "10px"
      }
      // input: {
      //   display: "none"
      // }
    }
  }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
