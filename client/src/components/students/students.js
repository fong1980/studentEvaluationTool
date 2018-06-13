import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUsers } from "../../actions/users";
import { getStudents } from "../../actions/students";
import { Link } from "react-router-dom";
import { getStudent } from "../../actions/student";

class Students extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};

    this.onclickgetStudents = this.onclickgetStudents.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    if (this.props.students === null) this.props.getStudents(id);
    if (this.props.authenticated) {
      if (this.props.users === null) this.props.getUsers();

      const { id } = this.props.match.params;
      console.log(id, "---");
      if (!this.props.quiz) {
      }

      //getStudents
    }
  }

  onclickgetStudents(studId) {
    this.props.getStudent(studId);
    console.log(studId);
  }

  render() {
    const { authenticated } = this.props; //games, users,createGame deleted
    if (!authenticated) return <Redirect to="/login" />;
    const { students } = this.props;

    return (
      <div>
        {!this.props.students && <div>Loading...</div>}
        {this.props.students && (
          <div>
            {students.map((student, i) => (
              <Link
                to={`/student/${student.id}`} //
                onClick={() => this.onclickgetStudents(student.id)}
              >
                <div>
                  <img
                    src={student.photo}
                    alt={student.firstName}
                    height="100"
                    width="100"
                  />
                  <br />
                  First Name: {student.firstName} <br />
                  Last Name: {student.lastName} <br />
                  <br />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  students: state.students
});

export default connect(
  mapStateToProps,
  { getUsers, getStudents, getStudent }
)(Students);
