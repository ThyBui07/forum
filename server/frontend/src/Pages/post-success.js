import React, { Component } from "react";

//import { useState, useEffect } from "react";

class PostSuccess extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            DataisLoaded: false,
          };
    }
    componentDidMount() {
        fetch("http://localhost:8080/post-sucess")
          .then((res) => res.json())
          .then((json) => {
            console.log(json)
            this.setState({
              items: json,
              DataisLoaded: true,
            });
          });
      }
  

  render() {
    const { items } = this.state;
    return (
      <div>
        <h1> Thanks! </h1>{" "}
          <p>Your recipe { items.title } has been added to the Forum!</p>
      </div>
    );
  }
}

export default PostSuccess;
