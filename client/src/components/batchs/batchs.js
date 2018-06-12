import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUsers } from "../../actions/users";
import { getBatchs } from "../../actions/batchs";

const a = ["adfa", "dfad", "asdfad"];
class batchs extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.batchs === null) this.props.getBatchs(); //=== null
    }
  }

  render() {
    const { authenticated } = this.props; //games, users,createGame deleted
    const { batchs } = this.props;

    //console.log(this.props.batchs);
    //console.log(typeof this.props.batchs);

    // console.log(object1);
    // console.log(typeof object1);
    // console.log(Object.values(object1));

    if (!authenticated) return <Redirect to="/login" />;
    if (!batchs) console.log("nee man");

    return (
      <div>
        <div className="all batch">batchlist</div>
        {console.log(batchs, "test")}
        {a.map(x => "x")}

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
