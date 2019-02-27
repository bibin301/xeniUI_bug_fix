import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import { googleLogin, 
  signUpInfo,
   loginInfo } from "../../../service/login/action";
   
import InputField from "../../Fields/TextField";
import CheckField from "../../Fields/CheckField";

class SignIn extends Component {
  static proptypes = {
    onHide: PropTypes.func,
    isdivHide: PropTypes.bool,
    isLandingSingup: PropTypes.bool
  };

  state = {
    isdivHide: this.props.isdivHide,
    isSignUpHide: false
  };

  handleSignUp = event => {
    event.preventDefault();
    this.setState({ isSignUpHide: true });
    this.setState({ isdivHide: false });
  };

  SignIn = event => {
    event.preventDefault();
    this.setState({ isSignUpHide: false });
    this.setState({ isdivHide: true });
  };

  handleFormInitialValues = () => {
    this.props.initialize({
      email: "",
      password: "",
      name: "",
      isActive: false,
      isSignup: false,
      emailSignUp: "",
      passwordSignup: ""
    });
  };

  signUpSubmit = value => {
    const payload = {
      name: value.name,
      email: value.emailSignUp ,
      password: value.passwordSignup
    };

    this.props.signUpInfo(payload);

    this.props.onHide();

  };

  signInSubmit = value => {
    this.props.loginInfo(value);
    this.props.onHide();
  };

  responseGoogle = response => {
    if (response) {
      const loginInfo = {
        email: response.profileObj.email,
        name: response.profileObj.name
      };
      this.props.googleLogin(loginInfo);
      this.props.onHide();
    }
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div
        className="modal backgroundDark"
        id="myModal"
        style={{ display: "block" }}
      >
    <div className="modal-dialog signInPopup">
      {this.state.isdivHide === true && (
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">SIGN IN</h4>
                <button
                  type="button"
                  onClick={this.props.onHide}
                  className="close"
                >
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <div className="socialBtnGroup">
                  {/* <button type="button">
                    <img src="images/facebook.png" alt="" /> Facebook
                  </button> */}
                    <GoogleLogin
                      clientId="707462947564-qtf2jjoh79k1mlqcjkmh6tlanjeu30rn.apps.googleusercontent.com"
                      buttonText="Google"
                      onSuccess={this.responseGoogle}
                      onFailure={this.responseGoogle}
                    >
                    Google
                    </GoogleLogin>
                </div>
                <div className="signWithEmail">
                  <hr />
                  <h6>or Sign in with Email</h6>
                  <hr />
                </div>
                <form onSubmit={handleSubmit(this.signInSubmit)}>
                  <div className="signInForm">
                    <div className="form-group mailIcon">
                      <Field
                        name="email"
                        type="text"
                        value=""
                        label="Email Address"
                        component={InputField}
                        placeholder="Email Address"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group passwordIcon">
                      <Field
                        name="password"
                        type="password"
                        value=""
                        label="Password"
                        component={InputField}
                        placeholder="Password"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      {/* <Field
                        name="isActive"
                        type="checkbox"
                        label="Keep me signed in"
                        component={CheckField}
                      /> */}
                      <NavLink
                        to={"/"}
                        href=""
                        className="forgotLink commonLink"
                      >
                        {/* Forgot Password */}
                      </NavLink>
                    </div>
                    <div className="form-group">
                      <button className="searchBtn" type="submit">
                        SIGN IN
                      </button>
                      <div className="dontHaveAccount">
                        Don't have an acount?{" "}
                        <a href="/" onClick={this.handleSignUp}>
                          {" "}
                          Create Account
                        </a>{" "}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )} 

      {this.state.isSignUpHide === true && (
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">CREATE YOUR ACCOUNT</h4>
                <button
                  type="button"
                  className="close"
                  onClick={this.props.onHide}
                >
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <h6>Create an account for members-only deals </h6>
                <div className="socialBtnGroup">
                  {/* <button type="button">
                    <img src="images/facebook.png" alt="" /> Facebook
                  </button> */}
                <GoogleLogin
                      clientId="707462947564-qtf2jjoh79k1mlqcjkmh6tlanjeu30rn.apps.googleusercontent.com"
                      buttonText="Google"
                      onSuccess={this.responseGoogle}
                      onFailure={this.responseGoogle}
                    >
                    Google
                </GoogleLogin>
                </div>
                <div className="signWithEmail">
                  <hr />
                  <h6>or Sign Up with Email</h6>
                  <hr />
                </div>
                <form onSubmit={handleSubmit(this.signUpSubmit)}>
                  <div className="signInForm">
                    <div className="form-group userIcon">
                      <Field
                        name="name"
                        type="text"
                        label="Name"
                        component={InputField}
                        placeholder="Name"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mailIcon">
                      <Field
                        name="emailSignUp"
                        type="text"
                        label="Email Address"
                        component={InputField}
                        placeholder="Email Address"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group passwordIcon">
                      <Field
                        name="passwordSignup"
                        type="password"
                        label="Password"
                        component={InputField}
                        placeholder="Password"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                     
                      <NavLink
                        to={"/"}
                        href=""
                        className="forgotLink commonLink"
                      >
                        {" "}
                        {/* Forgot Password */}
                      </NavLink>
                    </div>
                    <div className="form-group">
                      <button className="searchBtn" type="submit">
                        CREATE ACCOUNT
                      </button>
                      <div className="dontHaveAccount">
                        Already a member?{" "}
                        <a href="/" onClick={this.SignIn}>
                          Sign In{" "}
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )} 
            
        </div>

      </div>
    );
  }
}

const signInValidate = formProps => {
  const errors = {};

  if (!formProps.name) {
        errors.name = "Required";
  } else if(!/(.*[a-z]){3}/i.test(formProps.name)){
    errors.name = "Name must be mininum of two characters";
  }

  if (!formProps.email) {
    errors.email = "Required";
  } else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email))
  {
    errors.email = "Invalid email address";
  }

  if (!formProps.password) {
    errors.password = "Required";
  }

  if (!formProps.emailSignUp) {
    errors.emailSignUp = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.emailSignUp)
  ) {
    errors.emailSignUp = "Invalid email address";
  }

  if (!formProps.passwordSignup) {
    errors.passwordSignup = "Required";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(
      formProps.passwordSignup
    )
  ) {
    errors.passwordSignup = "Password must be minimum of 8 characters and should contain 1 uppercase 1 lowercase 1 digit 1 special character";
  }

  return errors;
};

const mapStateToProps = state => ({
  loginDetails: state.loginReducer.loginDetails,
  signupDetails: state.loginReducer.signupDetails
});

const mapDispatchToProps = dispatch => ({
  googleLogin: loginInfo => dispatch(googleLogin(loginInfo)),
  signUpInfo: value => dispatch(signUpInfo(value)),
  loginInfo: value => dispatch(loginInfo(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "signIn",
    validate: signInValidate
  })(SignIn)
);
