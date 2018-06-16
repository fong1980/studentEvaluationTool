import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUsers } from "../../actions/users";
import { getStudents } from "../../actions/students";
import { Link } from "react-router-dom";
import { getStudent } from "../../actions/student";
import { addEvaluation } from "../../actions/evaluations";
import { userId } from "../../jwt";
import { Z_FILTERED } from "zlib";

class EdditStudent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return <div>editpage</div>;
  }
}
const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  student: state.student,
  user:
    state.currentUser &&
    state.users &&
    state.users[userId(state.currentUser.jwt)]
});

export default connect(
  mapStateToProps,
  { getUsers, getStudent, addEvaluation }
)(EdditStudent);
