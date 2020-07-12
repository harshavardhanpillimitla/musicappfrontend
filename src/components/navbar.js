import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/postSlice";

class NavBar extends Component {
  onClick = (e) => {
    const jwt = this.props.state.user.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `JWT ${jwt}`,
    };
    this.props.dispatch(logout(headers));
  };

  render() {
    const { isAuthenticated } = this.props.state;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand disabled" to="/home">
          musiic
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/home">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>

            {!isAuthenticated ? (
              <React.Fragment>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    register
                  </Link>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="nav-item">
                  <p className="nav-link" onClick={this.onClick}>
                    logout
                  </p>
                </li>
                <li className="nav-item  mr-auto">
                  <p className="nav-link ">
                    {localStorage.getItem("username")}
                  </p>
                </li>
                <li className="nav-item  mr-auto">
                  <Link className="nav-link " to="/addsong">
                    addSong
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    state: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
