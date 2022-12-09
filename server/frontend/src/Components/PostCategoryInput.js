import React, { Component } from "react";
import '../Components/css/CreatePost.css';

class PostCategoryInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            DataisLoaded: false,
          };
    }
    
    componentDidMount() {
      fetch("http://localhost:8080")
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
            <select className="categorySelect" id="postCategoryId">

{items.map((item) => (
          <option value={item.id} key={item.id}>{item.title}</option> 
        ))}
            </select>
           
          );
    }
}
 
export default PostCategoryInput;