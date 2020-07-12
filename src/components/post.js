import React, { Component } from "react";

import { Link } from "react-router-dom";

class Post extends Component {
  render() {
    const { id, playlist_name } = this.props.post;
    let playlisturl = "/playlist/" + id;

    return (
      <div className="col-6">
        <div className="alert alert-info">
          <div className="container " style={{ minHeight: "300" }}>
            <div className="row">
              <div className="col-6">
                <Link to={playlisturl}>
                  <div>playlist Name: {playlist_name}</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
