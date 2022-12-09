import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  HashRouter,
} from "react-router-dom";

import { connect, Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "../shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import AuthGuard from "./Gurads/AuthGuard.guard";
import NoGuard from "./Gurads/NoGuard";
import PublicRoutes from "./publicRoutes";
import PrivateRoutes from "./privateRoutes";
import IdleTimer from "react-idle-timer";
import { logoutUser } from "../Redux/Actions/user/user.action";
import LoaderComponent from "../Components/Loader/Loader.component";

class Routing extends React.Component {
  constructor(props) {
    super(props);
    this.idleTimer = null;
    this.handleOnAction = this.handleOnAction.bind(this);
    this.handleOnActive = this.handleOnActive.bind(this);
    this.handleOnIdle = this.handleOnIdle.bind(this);
  }
  render() {
    return (
      // <Provider store={store}>
      //   <PersistGate loading={null} persistor={persistor}>
      //     <ConnectedRouter history={history}>
      //       <LoaderComponent />
      <div>
        <IdleTimer
          ref={(ref) => {
            this.idleTimer = ref;
          }}
          timeout={1000 * 60 * 20}
          onActive={this.handleOnActive}
          onIdle={this.handleOnIdle}
          onAction={this.handleOnAction}
          debounce={250}
        />
        {/* /krihakjhdkbakiaih */}
        <LoaderComponent></LoaderComponent>
        <Router basename={"/admin"}>
          <Switch>
            <AuthGuard path={`/auth`} component={PrivateRoutes} />
            {/* <AuthGuard path={`/auth`} component={PrivateRoutes} /> */}

            <NoGuard path={`/`} component={PublicRoutes} />
          </Switch>
        </Router>
      </div>
      //     </ConnectedRouter>
      //   </PersistGate>
      // </Provider>
    );
  }

  handleOnAction(event) {
    // console.log("user did something", event);
  }

  handleOnActive(event) {
    // console.log("user is active", event);
    // console.log("time remaining", this.idleTimer.getRemainingTime());
  }

  handleOnIdle = (event) => {
    // console.log("ssssss", this.props);
    this.props.logoutUser();

    // console.log("user is idle", event);
    // console.log("last active", this.idleTimer.getLastActiveTime());
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

const mapStateToProps = () => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Routing);
