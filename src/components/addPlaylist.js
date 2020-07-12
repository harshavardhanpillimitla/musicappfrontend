import React, { Component } from "react";

import { connect } from "react-redux";
import { createplaylist, adddummydatatoplaylist } from "../store/postSlice";

class AddPlaylist extends Component {
  state = {
    playlist_name: "",
  };
  componentDidUpdate() {
    if (this.props.playlistjustcreatedflag) {
      const jwt = this.props.user.token;
      const { id } = this.props.playlistjustcreated;

      if (jwt) {
        try {
          const headers = {
            "Content-Type": "application/json",
            Authorization: `JWT ${jwt}`,
          };
          let data = {
            playlist_name: id,
            playlistsongs: [],
          };
          this.props.dispatch(adddummydatatoplaylist(data, headers, id));
        } catch (error) {
          console.log(error.response);
        }
      }
    }
    if (this.props.success) {
      this.props.history.replace("/home");
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = async (e) => {
    const jwt = this.props.user.token;
    e.preventDefault();
    if (jwt) {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `JWT ${jwt}`,
        };
        let data = this.state;
        this.props.dispatch(createplaylist(data, headers));
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  render() {
    return (
      <div className="container ml-auto mr-auto mt-5">
        <div className="alert alert-info text-center ">Addplaylist</div>
        {this.props.last && (
          <div className="form-group alert alert-info text-center">
            {this.props.last}
          </div>
        )}
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group">
            <label for="exampleInputEmail1">playlist_name</label>
            <input
              type="text"
              className="form-control"
              id="playlist_name"
              aria-describedby="emailHelp"
              onChange={this.onChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              playlist
            </small>
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
    authenticated: state.isAuthenticated,
    success: state.justUpdated,
    playlistjustcreated: state.responseplaylist,
    user: state.user,
    playlistjustcreatedflag: state.playlistcreated,

    last: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddPlaylist);
