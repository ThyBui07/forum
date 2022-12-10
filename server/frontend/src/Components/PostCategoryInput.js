import React, { Component } from "react";
import '../Components/css/CreatePost.css';

class PostCategoryInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
          };
    }
    
    componentDidMount() {
      fetch("http://localhost:8080")
        .then((res) => res.json())
        .then((json) => {
          console.log(json)
          this.setState({
            categories: json,
          });
        });
    }

    render() { 
        const { categories } = this.state;
        return (
            <select className="categorySelect" id="postCategoryId">

{categories.map((item) => (
          <option value={item.id} key={item.id}>{item.title}</option> 
        ))}
            </select>
           
          );
    }
}
 
export default PostCategoryInput;