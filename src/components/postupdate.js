import React, { Component } from "react";

// import {postsUpdate} from '../store/postSlice'
import { connect } from "react-redux";

class PostUpdate extends Component {
  state = {
    name: "",
    latitude: 0.0,
    longitutude: 0.0,
    picture: null,
    id: 0,
  };
  componentDidMount() {
    try {
      const postid = parseInt(this.props.match.params.id);

      const post = this.props.state.list.filter((post) => post.id === postid);

      const { name, latitude, longitutude, picture, id } = post[0];

      this.setState({ name, latitude, longitutude, picture, id });
    } catch (ex) {
      alert("error");
    }
  }
  componentDidUpdate() {
    if (this.props.state.justUpdated) {
      this.props.history.replace("/home");
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onChangeImage = (e) => {
    this.setState({ picture: e.target.files[0] });
  };

  onSubmit = (e) => {
    e.preventDefault();

    try {
      const { id, name, latitude, longitutude } = this.state;
      e.preventDefault();

      let form_data = new FormData();
      form_data.append("picture", this.state.picture, this.state.picture.name);
      form_data.append("name", name);
      form_data.append("latitude", latitude);
      form_data.append("longitutude", longitutude);

      const jwt = this.props.state.user.token;

      const headers = {
        "content-type": "multipart/form-data",
        Authorization: `JWT ${jwt}`,
      };

      // this.props.dispatch(postsUpdate(headers,id,form_data));
    } catch (ex) {}
  };

  render() {
    return (
      <div className="container ml-auto mr-auto mt-5">
        <div className="alert alert-info text-center ">Add Post</div>
        <form encType="multipart/form-data" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label for="exampleInputEmail1">name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
              value={this.state.name}
              onChange={this.onChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="form-group">
            <label for="exampleInputPassword1">Picture</label>
            <input
              type="file"
              className="form-control"
              id="picture"
              onChange={this.onChangeImage}
            />
          </div>
          <input type="submit" />
        </form>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostUpdate);
