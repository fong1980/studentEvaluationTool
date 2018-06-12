import React, { PureComponent } from "react";
import { getGames, createGame } from "../../actions/games";
import { getUsers } from "../../actions/users";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
//import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
//import Card, { CardActions, CardContent } from "material-ui/Card";
//import Typography from "material-ui/Typography";
import "./GamesList.css";

class GamesList extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.users === null) this.props.getUsers();
    }
  }

  render() {
    const { authenticated } = this.props; //games, users,createGame deleted

    if (!authenticated) return <Redirect to="/login" />;

    //if (games === null || users === null) return null;
    //if (games === null || users === null) return null;

    return <Paper className="outer-paper">this is where we start!</Paper>;
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  games:
    state.games === null
      ? null
      : Object.values(state.games).sort((a, b) => b.id - a.id)
});

export default connect(
  mapStateToProps,
  { getGames, getUsers, createGame }
)(GamesList);
