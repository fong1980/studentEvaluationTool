import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUsers } from "../../actions/users";
import { getStudents } from "../../actions/students";

class Students extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};

    //this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    if (this.props.students === null) this.props.getStudents();
    if (this.props.authenticated) {
      if (this.props.users === null) this.props.getUsers();

      const { id } = this.props.match.params;
      console.log(id, "---");
      if (!this.props.quiz) {
        console.log("waar ben ik");
        //this.props.fetchQuiz(id)
      }

      //getStudents
    }
  }

  render() {
    const { authenticated } = this.props; //games, users,createGame deleted
    if (!authenticated) return <Redirect to="/login" />;

    return <div>testadsadsf</div>;
  }
}
const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users
});

export default connect(
  mapStateToProps,
  { getUsers, getStudents }
)(Students);
