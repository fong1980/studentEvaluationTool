import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import SignupPage from "./components/signup/SignupPage";
import GamesList from "./components/games/GamesList";
import GameDetails from "./components/games/GameDetails";
import LogoutPage from "./components/logout/LogoutPage";
import "./App.css";
import TopBar from "./components/layout/TopBar";
import Batchs from "./components/batchs/batchs";
import Students from "./components/students/students";
import Student from "./components/student/student";
import EdditStudent from "./components/editStudent/editStudent";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <nav>
              <TopBar />
            </nav>
            <main style={{ marginTop: 75 }}>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/logout" component={LogoutPage} />
              <Route exact path="/signup" component={SignupPage} />
              <Route exact path="/batchs" component={Batchs} />
              <Route exact path="/students/:id" component={Students} />
              <Route
                exact
                path="/student/:batchId/:studentId"
                component={Student}
              />
              <Route
                exact
                path="/edditStudent/:batchId/:studentId"
                component={EdditStudent}
              />

              <Route exact path="/games" component={GamesList} />
              <Route exact path="/games/:id" component={Students} />

              <Route exact path="/" render={() => <Redirect to="/batchs" />} />
            </main>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}
export default App;
