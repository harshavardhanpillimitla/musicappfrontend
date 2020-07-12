import React, { Component } from "react";

import { connect } from "react-redux";
import { addsong } from "../store/postSlice";

class AddSong extends Component {
  state = {
    song_name: "",
  };
  componentDidUpdate() {
    if (this.props.success) {
      this.props.history.replace("/home");
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = this.state;
      this.props.dispatch(addsong(data));
    } catch (error) {
      console.log(error.response);
    }
  };

  render() {
    return (
      <div className="container ml-auto mr-auto mt-5">
        <div className="alert alert-info text-center ">Login</div>
        {this.props.last && (
          <div className="form-group alert alert-info text-center">
            {this.props.last}
          </div>
        )}
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group">
            <label for="exampleInputEmail1">Song name</label>
            <input
              type="text"
              className="form-control"
              id="song_name"
              aria-describedby="emailHelp"
              onChange={this.onChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.isAuthenticated,
    success: state.justUpdated,
    last: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddSong);
