import React, { Component } from "react";


class CatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            DataisLoaded: false,
            selected: true,
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
              selected: true,
            });
          });
      }
    render() { 
        const { items } = this.state;
        return (
            <div className="CategoryList">
            <fieldset>
            <legend>Choose categories:</legend>
              {items.map((item) => (
                    <div>
                      <input type="checkbox" id={ item.id }></input>
                    <label for="{ item.id }"> { item.title } </label>
                    </div>
                    
             ))}
  
          </fieldset>
          </div>
          );
    }
}
 
export default CatList;