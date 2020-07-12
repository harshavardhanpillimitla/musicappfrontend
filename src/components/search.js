import React, { Component } from "react";

import { connect } from "react-redux";

class Search extends Component {
  state = {
    search: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = async (e) => {
    e.preventDefault();

    this.props.searchsong(this.state.search);
  };
  onClick = (e) => {
    let data = this.props.currentplaylistdata.slice();

    data.push(parseInt(e.target.id));

    this.props.addtoplaylist(data);
  };

  render() {
    console.log(this.props);
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
              id="search"
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
        {this.props.results && (
          <div className="container alert alert-info">
            <div className="row">
              <div className="col alert alert-secondary">
                <div className="center">search results:</div>
                <div>
                  {this.props.results.map((song) => (
                    <li id={song.id} className="my-2">
                      <div className="container">
                        <div className="row ">
                          <div className="col-6">
                            {song.song_name}&nbsp;&nbsp;
                          </div>
                          <div className="col-6">
                            <button
                              type="button"
                              id={song.id}
                              onClick={this.onClick}
                              className="btn btn-primary"
                            >
                              add to playlist
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    authenticated: state.isAuthenticated,
    success: state.justUpdated,
    user: state.user,
    results: state.searched,
    currentplaylistdata: state.currentplaylist,

    last: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
