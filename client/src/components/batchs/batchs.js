import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import { reducer as formReducer } from "redux-form";
import { getBatchs, createBatch } from "../../actions/batchs"; //createBatch
import { Link } from "react-router-dom";
import { getStudents } from "../../actions/students";
import { getUsers } from "../../actions/users";
import { reset } from "redux-form";

class batchs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onclickgetStudents = this.onclickgetStudents.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onclickgetStudents(batchId) {
    this.props.getStudents(batchId);
  }

  componentDidMount() {
    if (this.props.batchs === null) this.props.getBatchs();
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
    const { createRecord, reset } = this.props;
    event.preventDefault();
    this.props.createBatch(this.state);
    //this.setState({}); //why is this nog working?
    this.setState({ batchnr: "", startdate: "", endDate: "" }); //why is this nog working?
    reset();

    // this.props.reset('');
    console.log(this.state, "asdfadaf");
  }

  render() {
    const { authenticated } = this.props; //games, users,createGame deleted
    if (!authenticated) return <Redirect to="/login" />;
    const { batchs } = this.props;

    return (
      <div>
        {!this.props.batchs && <div>Loading...</div>}
        {this.props.batchs && (
          <div>
            <div className="all batch">batchlist</div>
            {batchs.map((batch, i) => (
              <div>
                <Link
                  to={`/students/${batch.id}`}
                  onClick={() => this.onclickgetStudents(batch.id)}
                >
                  nr:{batch.batchnr}
                </Link>
                <br />
                start date: {batch.startdate} <br />
                end date: {batch.startdate} <br />
                <br />
              </div>
            ))}
            <form name="myForm" onSubmit={this.handleSubmit}>
              <input
                name="batchnr"
                placeholder="batchnr"
                value={this.state.batchnr}
                onChange={this.handleInputChange}
              />

              <input
                name="startdate"
                type="date"
                value={this.state.startdate}
                onChange={this.handleInputChange}
              />

              <input
                name="enddate"
                type="date"
                placeholder="end date"
                value={this.state.endDate}
                onChange={this.handleInputChange}
              />

              <input type="submit" value="Submit" />
            </form>
          </div>
        )}

        <div className="form">-</div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  batchs: state.batchs
});

export default connect(
  mapStateToProps,
  { getUsers, getBatchs, getStudents, createBatch, reset }
)(batchs);
