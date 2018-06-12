import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUsers } from "../../actions/users";
import { getBatchs } from "../../actions/batchs";

const a = ["adfa", "dfad", "asdfad"];
class batchs extends PureComponent {
  componentDidMount() {
    if (this.props.batchs === null) this.props.getBatchs(); //=== null
    if (this.props.authenticated) {
    }
  }

  render() {
    const { authenticated } = this.props; //games, users,createGame deleted
    const { batchs } = this.props;
    //.log(this.props.batchs, "mount");

    //console.log(this.props.batchs);
    //console.log(typeof this.props.batchs);

    // console.log(object1);
    // console.log(typeof object1);
    // console.log(Object.values(object1));

    console.log(batchs, "asdf");
    if (!authenticated) return <Redirect to="/login" />;
    //if (!batchs) console.log("nee man");

    const render = () => {
      if (batchs)
        return (
          <div>
            {console.log(batchs, "---")}
            test
          </div>
        );
    };

    return (
      <div>
        <div className="all batch">batchlist</div>

        {render()}

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
