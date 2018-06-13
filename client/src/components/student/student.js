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
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    if (this.props.student === null) this.props.getStudent(id);
    if (this.props.authenticated) {
      if (this.props.users === null) this.props.getUsers();
    }
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

// / {student.evaluations.map(evaluation =>"test"}
