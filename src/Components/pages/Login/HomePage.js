import React, { Component } from "react";
import { connect } from "react-redux";
import { signInFn } from "../../../Redux/Actions/user/user.action";
//import LoaderComponent from '../../components/Loader/loader.component';
import LoginForm from "./loginForm";
import publicIp from "public-ip";

class HomePage extends Component {
  state = {
    showmodal: true,
  };

  componentDidMount() {
    /* let { token } = this.props;
        if (token !== null) {
            window.location.href = '/dashboard';
        } */
  }

  closeModal = () => {
    this.setState({ showmodal: true });
  };

  loginFormData = async (values) => {
    console.log(signInFn);
    let IP = await publicIp.v4();
    if (IP) {
      values.ip = IP;
    } else {
      values.ip = "157.36.101.202";
    }

    this.props.signInFn(values);
    /*   let { signIn, history } = this.props;
    loginFormData = async (values) => {
        let IP = await publicIp.v4()
        if(IP) {
            values.ip = IP
        }else {
            values.ip = "157.36.101.202"
        }
        
        
        this.props.signInFn(values)
      /*   let { signIn, history } = this.props;
        document.getElementById('spinner').style.display = 'block';
        document.getElementById('email').disabled = true;
        document.getElementById('password').disabled = true;
        document.getElementById('submit-login').innerHTML = '';
        signIn(values, history); */
  };

  /*  componentWillReceiveProps(props) {
        if (props.loading === false) {
            document.getElementById('spinner').style.display = 'none';
            document.getElementById('email').disabled = false;
            document.getElementById('password').disabled = false;
            document.getElementById('submit-login').innerHTML = 'Submit';
        }
    }
 */
  render() {
    return (
      <div className="Login">
        {/* <LoaderComponent /> */}
        <LoginForm handleFormSubmit={this.loginFormData} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //     loading: state.loader.loading,
    //    token: state.user.tokens
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInFn: (data, history) => dispatch(signInFn(data, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
