import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUsers } from "../../actions/users";
import {
  getStudents,
  createStudent,
  deleteStudent
} from "../../actions/students";
import { Link } from "react-router-dom";
import { getStudent } from "../../actions/student";

class Students extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};

    this.onclickgetStudents = this.onclickgetStudents.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    if (this.props.students === null) this.props.getStudents(id);
    if (this.props.authenticated) {
      if (this.props.users === null) this.props.getUsers();
    }
  }

  onclickgetStudents(studId) {
    this.props.getStudent(studId);
    console.log(studId);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    //console.log(this.state.batchnr, "i am in the state");
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.props.match.params.id, this.state);
    this.props.createStudent(this.props.match.params.id, this.state);

    // this.props.createBatch(this.state);
  }

  deleteStudent(studId) {
    console.log(studId, "ben ik er?");
    this.props.deleteStudent(studId);
  }

  render() {
    const { authenticated } = this.props; //games, users,createGame deleted
    if (!authenticated) return <Redirect to="/login" />;
    const { students } = this.props;
    const { id } = this.props.match.params;

    return (
      <div>
        {!this.props.students && <div>Loading...</div>}
        {this.props.students && (
          <div>
            batchnr:{id}
            {students.map((student, i) => (
              <div>
                <Link
                  to={`/student/${student.id}`} //
                  onClick={() => this.onclickgetStudents(student.id)}
                >
                  <img
                    src={student.photo}
                    alt={student.firstName}
                    height="120"
                    width="100"
                  />
                </Link>
                <br />
                First Name: {student.firstName} <br />
                Last Name: {student.lastName} <br />
                <button onClick={() => this.deleteStudent(student.id)}>
                  Delete
                </button>
                <br />
              </div>
            ))}
          </div>
        )}

        <div>
          create student
          <form onSubmit={this.handleSubmit}>
            <input
              name="firstName"
              placeholder="firstName"
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />

            <input
              name="lastName"
              placeholder="lastName"
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />

            <input
              name="photo"
              placeholder="photo link"
              value={this.state.photo}
              onChange={this.handleInputChange}
            />

            <input type="submit" value="Submit" />
            <br />
            <br />
            <br />
            <br />
          </form>
        </div>
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
  { getUsers, getStudents, getStudent, createStudent, deleteStudent }
)(Students);

//http post :4000/addStudent/2 firstName=henk lastName=nietsnuts photo="thisIsaPic.nl" //add student
//http delete :4000/student/2
