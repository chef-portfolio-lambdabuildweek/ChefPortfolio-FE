import React, { Component } from "react";
import axios from "axios";


import PostList from "../Components/Posts/PostList";
import PostForm from "../Components/Posts/PostForm";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      selected: "all",
      tabs: [],
      posts: [],
      newPost: [],
      username: ""
    };
  }

  getProfile = () => {
    const token = localStorage.getItem("jwt");
    const profile = localStorage.getItem("username");
    const options = {
      headers: {
        Authorization: token
      }
    };

    if (token) {
      axios
        .get(
          `https://chef-portfolio.herokuapp.com/api/post/${profile}`,
          options
        
        )
        .then(res => {
          if (res.status === 201 && res.data) {
            console.log("Help!", res.data);
            this.setState({ loggedIn: true, posts: res.data });
          } else {
            throw new Error();
          }
        })
        .catch(err => {
           this.props.history.push("/login");
        });
    }
  };

  componentDidMount() {
    this.getProfile();
  }
 
  componentDidUpdate(prevProps) {
    const { pathname } = this.props.location;
    if (pathname === "/" && pathname !== prevProps.location.pathname) {
      this.getPost();
    }
    if (this.state.newPost.length > 0) {
      this.getPost();
      this.setState({
        newPost: []
      });
    }
  }

  logout = () => {
    localStorage.removeItem("jwt");
    this.props.history.push("/Login");
  };

  changeSelected = tab => {
    this.setState({ selected: tab });
  };

  filterPosts = () => {
    if (this.state.selected === "all") {
      return this.state.posts;
    } else {
      return this.state.posts.filter(
        post => post.category === this.state.selected
      );
    }
  };

  togglePost = info => {
    const token = localStorage.getItem("jwt");
    const changes = { title: info.title, category: info.category, link: info.link, seen: !info.seen, public: info.public };
    const id = info.id;
    console.log(info)
    const options = {
      headers: {
        Authorization: token
      }
    };

    if (token) {
      axios
        .put(
          `https://chef-portfolio.herokuapp.com/api/post/update/${id}`,
          changes,
          options
        )
        .then(res =>
          this.setState({
            posts: this.state.posts.map(post => {
              if (post.id === id) {
                return {
                  ...post,
                  seen: !post.seen
                };
              }
              return post;
            })
          })
        )
        .catch(err => console.log(err));
    }
  };

  addNewArticle = info => {
    const token = localStorage.getItem("jwt");
    const options = {
      headers: {
        Authorization: token
      }
    };

    if (token) {
      axios
        .post(
          "https://chef-portfolio.herokuapp.com/api/post/create",
          info,
          options
        )
        .then(res => this.setState({ newPost: res.data }))
        .catch(err => console.log(err));
    }
  };

  render() {
    if(!localStorage.getItem('jwt')) {this.props.history.push('/login')}
    return (
      <div className="content-container">
        <PostList posts={this.filterPosts()} toggleCard={this.togglePost} />
        <PostForm addNewArticle={this.addNewArticle} />
      </div>
    );
  }
}