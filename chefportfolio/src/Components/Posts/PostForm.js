import React, { Component } from "react";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      category: "news",
      link: "",
      imgURL: "",
      username: localStorage.getItem("username"),
      seen: false
     
    };
  }

  addPost = event => {
    this.props.addNewPost(this.state);

    this.setState({
      ...this.state,
      title: "",
      category: "news",
      link: "",
      imgURL: "",
      username: localStorage.getItem("username"),
      seen: false

    });
  };

  handleInputChange = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="input-form">
        <h2>Add Post</h2>
        <form onSubmit={this.addPost}>
          <div className="input">
            <input
              onChange={this.handleInputChange}
              placeholder="Title"
              value={this.state.title}
              name="title"
              className="input-box"
            />
            <input
              onChange={this.handleInputChange}
              placeholder="Link"
              value={this.state.link}
              name="link"
              className="input-box"
            />
            <div className="category-select">
              <label className="category-label">Category:</label>
              <select name="category" onChange={this.handleInputChange}>
                <option value="news">News</option>
                <option value="animals">Animals</option>
                <option value="technology">Technology</option>
                <option value="business">Business</option>
                <option value="art">Art</option>
                <option value="misc">Misc</option>
              </select>
            </div>
          </div>
         

          <button className="save-article-btn"type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default PostForm;