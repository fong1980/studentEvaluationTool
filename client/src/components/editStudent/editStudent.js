import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUsers } from "../../actions/users";
import { getStudents } from "../../actions/students";
import { Link } from "react-router-dom";
import { getStudent } from "../../actions/student";
import { addEvaluation } from "../../actions/evaluations";
import { userId } from "../../jwt";
import { editStudent } from "../../actions/student";
// editStudent

class EdditStudent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.editStudent = this.editStudent.bind(this);
  }

  componentWillMount() {
    console.log(this.props.match.params, "what is in here?");
    const { batchId, studentId } = this.props.match.params;

    // console.log(batchId, "batchnummer?");
    // console.log(studentId, "studId");

    if (this.props.student === null) this.props.getStudent(studentId);
    if (this.props.authenticated) {
      if (this.props.users === null) this.props.getUsers();
    }
    this.props.getStudents(this.props.match.params.batchId);
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });

    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log(this.state);
    this.setState({ firstName: "", lastName: "" });
    this.props.editStudent(this.state, this.props.match.params.studentId);
  }
  onclickToBatch(batchId) {
    console.log("tobatch");
    this.props.getStudents(batchId);
  }

  render() {
    const { authenticated } = this.props; //games, users,createGame deleted
    if (!authenticated) return <Redirect to="/login" />;
    const { student } = this.props;
    const { id } = this.props.match.params;

    console.log(student);
    return (
      <div>
        {!student && <div>Loading...</div>}
        {student && (
          <div>
            {" "}
            <form onSubmit={this.handleSubmit}>
              <img
                src={student.photo}
                alt={student.firstName}
                height="120"
                width="100"
              />
              <br />
              new first Name:
              <input
                name="firstName"
                placeholder="firstName"
                value={this.state.firstName}
                onChange={this.handleInputChange}
              />
              <br />
              New last Name:
              <input
                name="lastName"
                placeholder="lastName"
                value={this.state.lastName}
                onChange={this.handleInputChange}
              />
              <br />
              <input type="submit" value="Submit" />
              <br />
            </form>
            <Link to={`/students/${this.props.match.params.batchId}`}>
              <button
                onClick={() =>
                  this.onclickToBatch(this.props.match.params.batchId)
                }
              >
                back to batch
              </button>
            </Link>
          </div>
        )}
        <div>div</div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  student: state.student,
  user:
    state.currentUser &&
    state.users &&
    state.users[userId(state.currentUser.jwt)],
  student: state.student
});

export default connect(
  mapStateToProps,
  { getUsers, getStudents, getStudent, addEvaluation, editStudent }
)(EdditStudent);
