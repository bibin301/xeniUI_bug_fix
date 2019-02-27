import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer, Flip } from "react-toastify";
import Popover from "react-popover";

import { init } from  '../../service/common/action'
import "react-toastify/dist/ReactToastify.css";

import { map as _map } from "lodash";

import { logOut } from "../../service/login/action";
import { code } from "../../service/common/action";
import img_user from "../../asset/images/user.png";
import img_logo from "../../asset/images/logo.png";
import countryflag  from '../../asset/country'
import countryLabel from '../../asset/countryLabel'
import ReactFlagsSelect from "react-flags-select";
//import css module
import "react-flags-select/css/react-flags-select.css";

//OR import sass module
import "react-flags-select/scss/react-flags-select.scss";

class TopNav extends Component {
  
  static proptypes = {
    isGuest: PropTypes.bool.isRequired,
    userInfo: PropTypes.any,
    onSignIn: PropTypes.func,
    isVisibleSignIn: PropTypes.bool,
    country:""
  };

  static defaultProps = {
    isGuest: true
  };

  state = {
    enableUserAction: false,
    selectedCode: "",
    isMenuExpend: false
  };

  handleChange = event => {
    this.setState({ selectedCode: event.target.value }, () =>
      this.props.code(this.state.selectedCode)
    );
  };
 
  componentDidMount() {
    this.props.init();
  } 

  _subMenu = [
    {
      label: "Signin",
      action: this.handleSignIn,
      isGuest: true
    },
    {
      label: "SignOut",
      action: this.handleLogout,
      isGuest: false
    },
    {
      label: "Dashboard",
      action: this.handleDashboard,
      isGuest: false
    }
  ];

  handleDashboard = () => {
    this.handleHidePopover();
    this.props.history.push("/dashboard");
    // this.setState({ enableUserAction: false });
  };

  aboutUs = () => {
    this.props.history.push("/aboutUs");
  }

  handleSignIn = () => {
    this.handleHidePopover();
    this.props.onSignIn();
  };

  handleLogout = () => {
    this.handleHidePopover();
    this.props.logOut();
  };

  goBack = () => {

  window.location.reload();
  this.props.history.push("/hotel");

  }

  selectCountry(val) {
    this.setState({ country: val });
  }

  handleHidePopover = () => this.setState({ enableUserAction: false });
  
  render() {

    const { isGuest, countryCode } = this.props;
    const { enableUserAction ,country} = this.state;
    const result = _map(countryCode, "currencies");
    const { isMenuExpend } = this.state;
    return (
      <div>
        <ToastContainer autoClose={4000} transition={Flip} />
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
          {/* <NavLink  to="/hotel">  <span className="navbar-brand" href="#">
              <img src={img_logo} />
            </span></NavLink>  */}
            <a><span className="navbar-brand" href="#">
              <img src={img_logo}  onClick={this.goBack}/>
            </span> </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => this.setState({isMenuExpend: !isMenuExpend})}
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className={ isMenuExpend ? "collapse navbar-collapse justify-content-end show" : "collapse navbar-collapse justify-content-end"}
              id="navbarSupportedContent"
            >
              {/* TODO : Remove global search if not needed */}
              {/* <div className="navbarSearch">
                <input type="text" />
                <img src={img_headerSearch} />
              </div> */}
              <ul className="navbar-nav">
                {isGuest ? (
                  <li className="nav-item">
                    <span
                      className="nav-link rightLine"
                      onClick={this.props.onSignIn}
                    >
                      Sign In
                    </span>
                  </li>
                ) : (
                    <li className="nav-item active">
                      <span
                        className="nav-link rightLine"
                        href="#"
                        onClick={() =>
                          this.setState({ enableUserAction: !enableUserAction })
                        }
                      >
                        <span>
                          <img src={img_user} width="25px" />
                        </span>{" "}
                        {this.props.loginDetails && this.props.loginDetails.name}
                        <Popover
                          isOpen={enableUserAction}
                          style={{ zIndex: 99999 }}
                          preferPlace="below"
                          className="popover"
                          tipSize={0.01}
                          onOuterAction={this.handleHidePopover}
                          body={this.renderUserAction()}
                        >
                          <i className="fas fa-angle-down" />
                        </Popover>
                      </span>
                    </li>
                  )}
                <li className="nav-item">
                  <span className="nav-link rightLine" href="#" onClick={this.aboutUs}>
                    About Us
                  </span>
                </li>

                <li className="nav-item">
                  {/* <span className="nav-link " href="#">
                    USA <i className="fas fa-angle-down" />
                  </span> */}
                   <ReactFlagsSelect
                   countries={countryflag} 
                   customLabels={countryLabel} 
                   defaultCountry="US" />
                  {/* <select className="navSelectBox" defaultValue="USD" value={this.state.selectedCode} onChange={this.handleChange}>
                    <option value=""> USD</option>
                    {_map(result, (each, i) => _map(each, (value, index) =>
                      <option key={index} value={value.code}>{value.code}</option>
                    ))}
                  </select> */}
                </li>
                <li className="nav-item">
                  <span className="nav-link " href="#">
                    <button className="goPro">Go Pro</button>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  renderUserAction = () => {
    // return <div style={{background: 'white'}}>
    //     {_map(this._subMenu, (item, i) =>
    //       <button key={i} onClick={item.action}>{item.label}</button>)
    //     }
    //   </div>;

    return <div className='popover-body'>
      {this.props.isGuest
        ? <div className='dropdown-item' onClick={this.handleSignIn}>
          Sign In
            </div>
        : <React.Fragment>
          <div className='dropdown-item' onClick={this.handleDashboard}>
            Dashboard
              </div>
          <div className='dropdown-item' onClick={this.handleLogout}>
            Log Out
              </div>
        </React.Fragment>}
    </div>
  }
}

const mapStateToprops = state => ({
  isGuest: !state.loginReducer.loginStatus,
  loginDetails: state.loginReducer.loginDetails,
  countryCode: state.commonReducer.countryCode,
  selectedCountryCode: state.commonReducer.selectedCountryCode
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut()),
  code: value => dispatch(code(value)),
  init: () => dispatch(init())
});

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(withRouter(TopNav));

