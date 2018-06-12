import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUsers } from "../../actions/users";
import { getBatchs } from "../../actions/batchs";

class batchs extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.batchs === null) this.props.getBatchs();
    }
  }

  render() {
    const { authenticated } = this.props; //games, users,createGame deleted

    if (!authenticated) return <Redirect to="/login" />;

    return (
      <div>
        <div className="all batch">batchlist</div>
        <div className="form">form</div>
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
