import React, { Component } from "react";
import '../Components/css/Nav.scss';


class Categories extends Component {
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
            items: json.categories,
            DataisLoaded: true,
          });
        });
    }
    render() { 
      const { items } = this.state;
        return (
          <div className="sidenavCat">
            <div className="sidelinksCat">
            <h1> Categories </h1>{" "}
            {items.map((item) => (
              <div className="categoriesList" key={item.id}>{item.title}</div> 
            ))}
            </div>
          </div>
          );
    }
}
 
export default Categories;