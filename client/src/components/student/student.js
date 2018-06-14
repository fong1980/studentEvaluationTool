import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUsers } from "../../actions/users";
import { getStudents } from "../../actions/students";
import { Link } from "react-router-dom";
import { getStudent } from "../../actions/student";

class Student extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    if (this.props.student === null) this.props.getStudent(id);
    if (this.props.authenticated) {
      if (this.props.users === null) this.props.getUsers();
    }
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state, "-----");
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log(this.state, "ik ben in submit");
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

            <input type="submit" value="SAVE, next student" />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  student: state.student
});

export default connect(
  mapStateToProps,
  { getUsers, getStudent }
)(Student);

// http post :4000/evaluation/11/1 remark=favorstudent date="22-04-2019" color=green
// @Post("/evaluation/:stuId/:userId")
