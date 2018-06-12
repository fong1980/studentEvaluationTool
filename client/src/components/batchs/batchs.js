import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUsers } from "../../actions/users";
import { getBatchs } from "../../actions/batchs";

class batchs extends PureComponent {
  componentDidMount() {
    if (this.props.batchs === null) this.props.getBatchs(); //=== null
    if (this.props.authenticated) {
    }
  }

  render() {
    const { authenticated } = this.props; //games, users,createGame deleted
    const { batchs } = this.props;

    return (
      <div>
        {!batchs && <div>Loading...</div>}
        {console.log(batchs, "the one and only")}
        <div className="all batch">batchlist</div>

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
  { getUsers, getBatchs }
)(batchs);
