import React, { Component } from "react";

import { connect } from "react-redux";
import Song from "./song";
import {
  getplaylistdata,
  searched,
  addsongtoplaylist,
} from "../store/postSlice";
import Search from "./search";
import { getplaylistdataforupdate } from "../store/postSlice";

class SongList extends Component {
  state = {};

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  addtoplaylist = (songs) => {
    const jwt = this.props.user.token;
    const playlistid = this.props.state.id;
    alert(playlistid);

    if (jwt) {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `JWT ${jwt}`,
        };
        const data = {
          playlist_name: this.props.state.playlist_name.id,
          playlistsongs: songs,
        };

        this.props.dispatch(addsongtoplaylist(data, headers, playlistid));
      } catch (error) {
        console.log(error.response);
      }
    }
  };
  searchsong = (keyword) => {
    const jwt = this.props.user.token;
    const playlistid = this.props.state.playlist_name.id;

    if (jwt) {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `JWT ${jwt}`,
        };

        this.props.dispatch(searched(keyword, headers));
        this.props.dispatch(getplaylistdataforupdate(headers, playlistid));
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  componentDidUpdate() {
    const jwt = this.props.user.token;
    const playlistid = this.props.state.id;
    if (!this.props.isAuthenticated) {
      this.props.history.replace("/");
    }
    if (this.props.updated) {
      try {
        if (jwt) {
          const dispatch = this.props.dispatch;
          const id = parseInt(this.props.match.params.id);
          const data = {
            "Content-Type": "application/json",
            Authorization: `JWT ${jwt}`,
          };

          dispatch(getplaylistdata(data, id));
        }
      } catch (ex) {
        console.log(ex);
      }
    }

    if (jwt) {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `JWT ${jwt}`,
        };

        this.props.dispatch(getplaylistdataforupdate(headers, playlistid));
      } catch (error) {
        console.log(error.response);
      }
    }
  }
  componentDidMount() {
    const jwt = this.props.user.token;

    try {
      if (jwt) {
        const dispatch = this.props.dispatch;
        const id = parseInt(this.props.match.params.id);
        const data = {
          "Content-Type": "application/json",
          Authorization: `JWT ${jwt}`,
        };

        dispatch(getplaylistdata(data, id));
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  render() {
    console.log(this.props.state);
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-6">
            <Song post={this.props.state} addtoplaylist={this.addtoplaylist} />
          </div>
          <div className="col-6">
            <Search
              searchsong={this.searchsong}
              addtoplaylist={this.addtoplaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.playlistdata,
    user: state.user,
    updated: state.justUpdated,

    isAuthenticated: state.isAuthenticated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongList);
