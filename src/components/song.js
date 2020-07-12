import React, { Component } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Song extends Component {
  deleted = (e) => {
    let data = this.props.currentplaylistdata
      .slice()
      .filter((song) => song !== parseInt(e.target.id));

    this.props.addtoplaylist(data);
  };
  render() {
    const { id, playlistsongs } = this.props.post;
    let postdetailurl = "/postdetail/" + id;

    return (
      <div className="col">
        <div className="alert alert-info">
          <div className="container-fluid " style={{ minHeight: "300" }}>
            <div className="row">
              <div className="col">
                <div className="alert alert-warning">playlist name : {id} </div>
                <ul>
                  {playlistsongs &&
                    playlistsongs.map((song) => (
                      <li id={song.id}>
                        <div className="container">
                          <div className="row my-2">
                            <div className="col-6">{song.song_name} </div>
                            <div className="col-6">
                              <button
                                className="btn btn-warning"
                                id={song.id}
                                onClick={this.deleted}
                              >
                                delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}

                  <Link to={postdetailurl}></Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentplaylistdata: state.currentplaylist,
  };
};

export default connect(mapStateToProps)(Song);
