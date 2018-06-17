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
// import { LinearProgress } from "@material-ui/core/LinearProgress";

class Students extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      photo:
        "http://www.breakingscience.be/src/Frontend/Files/blog/images/source/einstein-een-rebels-genie.jpg"
    };

    this.onclickgetStudent = this.onclickgetStudent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.pickStudent = this.pickStudent.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (this.props.students === null) this.props.getStudents(id);
    if (this.props.authenticated) {
      if (this.props.users === null) this.props.getUsers();
    }
  }

  allScoreByBatch(batchEvaluation) {
    {
      batchEvaluation.length === 0 && <div>....loading</div>;
    }
    const allColorBatch = [];

    let allcolor = [];
    batchEvaluation.map(student =>
      student.evaluations.map(evaluations => {
        allcolor.push(evaluations.color);
      })
    );
    let total = allcolor.length;
    console.log(allcolor, "all color");
    // console.log(total, "totaal?");
    const red = allcolor.filter(x => x === "red").length;
    const orange = allcolor.filter(x => x === "orange").length;
    const green = allcolor.filter(x => x === "green").length;

    total = red + orange + green;
    // console.log("total:", total);
    // console.log("red:", red);
    // console.log("orange:", orange);
    // console.log("green:", green);

    return (
      <div>
        <div>red {this.calcPercentage(red, total)} %</div>
        <div>orange {this.calcPercentage(orange, total)} %</div>
        <div>green {this.calcPercentage(green, total)} %</div>
      </div>
    );
  }

  calcPercentage(color, total) {
    return Math.round((color / total) * 100);
  }

  onclickgetStudent(studId) {
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
    this.props.createStudent(this.props.match.params.id, this.state);
    console.log(this.state);
  }

  deleteStudent(studId) {
    this.props.deleteStudent(studId);
  }

  getLatestColor(evaluations) {
    // console.log(evaluations, "adsfadfadfadfadf----");
    if (evaluations.length < 1) {
      evaluations.sort(function(obj1, obj2) {
        return new Date(obj2.date) - new Date(obj1.date);
      });
      return "no evaluation yet";
    } else {
      return evaluations[0].color;
    }
  }

  pickStudent(value) {
    const array = [];
    value.map(x =>
      x.evaluations.map(
        evaluation =>
          array.push({
            color: evaluation.color,
            id: x.id,
            firstname: x.firstName,
            lastname: x.lastName
          }) //all colors and id in array.
      )
    );

    const chance = Math.round(Math.random() * 100);
    const redArray = array.filter(x => x.color === "red");
    const orangeArray = array.filter(x => x.color === "orange");
    const greenArray = array.filter(x => x.color === "green");
    var student = 0;

    if (chance < 45) {
      student = redArray[Math.floor(Math.random() * redArray.length)];
    }
    if (chance > 45 && chance < 80) {
      student = orangeArray[Math.floor(Math.random() * orangeArray.length)];
    }
    if (chance >= 81) {
      student = greenArray[Math.floor(Math.random() * greenArray.length)];
    }
    console.log(student, "sjjjj");
    alert(
      "the student is " +
        "name:" +
        student.firstname +
        " " +
        student.lastname +
        " " +
        student.color
    );
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
            batchnr:{id}
            {"   "}
            {students && this.allScoreByBatch(students)}
            {students.map((student, i) => (
              <div>
                <Link
                  to={`/student/${this.props.match.params.id}/${student.id}`}
                  onClick={() => this.onclickgetStudent(student.id)}
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
                Last Color:{this.getLatestColor(student.evaluations)} <br />
                <button onClick={() => this.deleteStudent(student.id)}>
                  Delete
                </button>
                {console.log(this.props.match.params.id, "--", student.id)}
                <Link
                  to={`/edditStudent/${this.props.match.params.id}/${
                    student.id
                  }`}
                  onClick={() => this.onclickgetStudent(student.id)}
                >
                  <button>Edit</button>
                </Link>
                <br />
              </div>
            ))}
          </div>
        )}
        <div />

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
            <button onClick={() => this.pickStudent(students)}>
              pick a random student
            </button>
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
