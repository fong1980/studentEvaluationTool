import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { getBatchs } from "../../actions/batchs";
import { Link } from "react-router-dom";
import { getStudents } from "../../actions/students";
import { getUsers } from "../../actions/users";

class batchs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onclickgetStudents = this.onclickgetStudents.bind(this);

    //this.handleSubmit = this.handleSubmit.bind(this)
  }

  onclickgetStudents(batchId) {
    this.props.getStudents(batchId);
    //getStudents(id);
    //http get :4000/studentBatch/2
  }

  componentDidMount() {
    if (this.props.batchs === null) this.props.getBatchs(); //=== null
    if (this.props.authenticated) {
      if (this.props.users === null) this.props.getUsers();
    }
  }

  handleInputChange(e) {
    this.setState({
      batchnr: e.target.value,
      startdate: e.target.value
    });
    //console.log(this.state.batchnr, "i am in the state");
  }

  handleSubmit(event) {
    //event.preventDefault();
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
                  to={`/students/`} //${batch.id}
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
            <form>
              <input
                name={"batchnr"}
                placeholder="batchnr"
                value={this.state.batchnr}
                onChange={this.handleInputChange}
              />

              <input
                name={"startDate"}
                placeholder={this.state.startdate}
                value=""
                //onChange={this.handleInputChange}
              />

              <input
                name={"endDate"}
                placeholder="end date"
                value=""
                //onChange={this.handleInputChange}
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
  { getUsers, getBatchs, getStudents }
)(batchs);
