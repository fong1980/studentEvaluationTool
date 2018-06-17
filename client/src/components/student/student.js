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

class Student extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { batchId, studentId } = this.props.match.params;
    console.log(this.props.match.params.StudentId);

    if (this.props.student === null) this.props.getStudent(studentId);
    if (this.props.authenticated) {
      if (this.props.users === null) this.props.getUsers();
    }
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    //if (this.EvaluationCheckDate(this.props.student.id).length)==0)
    //console.log(this.EvaluationCheckDate(this.props.student.id).length);

    this.setState({ color: "", remark: "", date: "" });
    this.props.addEvaluation(
      this.props.user.id, //id teacher
      this.props.student.id, //id student
      this.state
    );
    setTimeout(2000);

    // this.props.getStudent(this.props.match.params.StudentId);
  }

  EvaluationCheckDate() {
    console.log(this.props.student, "adfad");
    const dateArray = this.props.student.evaluations.map(date => date.date);

    const dateNow = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, "-");

    const date2 = dateArray.filter(date => {
      if (date == dateNow) {
      } else {
        return;
      }
    });
    return date2;
  }

  onclickToBatch(batchId) {
    console.log(batchId, "adsfadfaafd");
    this.props.getStudents(batchId);
  }

  render() {
    const { authenticated } = this.props; //games, users,createGame deleted
    if (!authenticated) return <Redirect to="/login" />;
    const { student } = this.props;

    return (
      <div>
        {!this.props.student && <div>Loading...</div>}

        {
          // student.evaluations.map(evaluation => "evaluation")
        }

        {this.props.student && (
          <div>
            <div>
              score:
              {student.evaluations.map(evaluation => (
                <div>{evaluation.color}</div>
              ))}
            </div>
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
          </div>
        )}

        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              date:
              <input
                name="date"
                type="date"
                value={this.state.date}
                onChange={this.handleInputChange}
              />
              <br />
              <input
                name="color"
                type="radio"
                value="red"
                onChange={this.handleInputChange}
              />
              Red <br />
              <input
                name="color"
                type="radio"
                value="orange"
                onChange={this.handleInputChange}
              />Orange<br />
              <input
                name="color"
                type="radio"
                value="green"
                onChange={this.handleInputChange}
              />Green<br />
              <br />
              remark{" "}
              <textarea
                name="remark"
                onChange={this.handleInputChange}
                value={this.state.remark}
                rows="4"
                cols="50"
              />
            </label>
            <br />
            <input type="submit" value="Submit" />
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
    state.users[userId(state.currentUser.jwt)]
});

export default connect(
  mapStateToProps,
  { getUsers, getStudent, addEvaluation, getStudents }
)(Student);

// http post :4000/evaluation/11/1 remark=favorstudent date="22-04-2019" color=green
// @Post("/evaluation/:stuId/:userId")

// import { userId } from "../../jwt";
// // const mapStateToProps = state => ({
// //   user:
// //     state.currentUser &&
// //     state.users &&
// //     state.users[userId(state.currentUser.jwt)]
// // });
// {this.props.user.firstname}
