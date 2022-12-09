import React, { Component } from "react";


class CatList extends Component {
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
            <div className="CategoryList">
            <fieldset>
            <legend>Choose categories:</legend>
            <div>
            {items.map((item) => (
                    <div key="{item.id}">
                      <input value="{item.id}" type="checkbox" />
                      <span>{item.title}</span>
                    </div>
                    
             ))}
            </div>
              
  
          </fieldset>
          </div>
          );
    }
}
 
export default CatList;