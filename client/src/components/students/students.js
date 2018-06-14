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
    //console.log(this.props.match.params.id, this.state);
    this.props.createStudent(this.props.match.params.id, this.state);
  }

  deleteStudent(studId) {
    this.props.deleteStudent(studId);
  }
  getAllcolor(value) {
    const array = [];
    value.map((
      x //error?
    ) =>
      x.evaluations.map(
        evaluation => array.push({ color: evaluation.color, id: x.id }) //all colors and id in array.
      )
    );
    //const rand = array[Math.floor(Math.random() * array.length)];

    const chance = Math.round(Math.random() * 100);
    // console.log(choic§e, "wat is het nummer?");

    const redArray = array.filter(x => x.color == "red");
    const orangeArray = array.filter(x => x.color == "orange");
    const greenArray = array.filter(x => x.color == "green");

    if (chance < 45) {
      return redArray[Math.floor(Math.random() * redArray.length)].id;
      //console.log(redArray[Math.floor(Math.random() * redArray.length)].id);
    }
    if (chance > 45 && chance < 80) {
      return orangeArray[Math.floor(Math.random() * orangeArray.length)];
    }
    if (chance >= 81) {
      return greenArray[Math.floor(Math.random() * greenArray.length)];
    }
  }

  render() {
    const { authenticated } = this.props; //games, users,createGame deleted
    if (!authenticated) return <Redirect to="/login" />;
    const { students } = this.props;
    const { id } = this.props.match.params;

    return (
      <div>
        {!students && <div>Loading...</div>}
        {students && (
          <div>
            {console.log(this.getAllcolor(students), "jo man")}
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
          <button>pick a random student</button>
        </div>

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

//rand = myArray[Math.floor(Math.random() * myArray.length)]; //random array
//array.filter(x => x.color == "red"), "red"); filter for green/red/etc.
