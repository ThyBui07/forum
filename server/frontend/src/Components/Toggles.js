import { Component } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Container";

import Form from 'react-bootstrap/Form';

const categories = ['Apetizer', 'Beverage', 'Breakfast', 'Comfort food', 'Lunch', 'Salad', 'Smothie', 'Snack', 'Soup', 'Vegan', 'Savoury', 'Sweet'];
class Toggles extends Component {
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
          this.setState({
            items: json.categories,
            DataisLoaded: true,
          });
        });
    }
    render() {
        //when :8080 works then use this categories fetch from api
        //const { categories } = this.state;
        return (
            <div className="d-flex flex-wrap no-gutters mb-4 pr-0 pl-0">
                {categories.map((item) => (
                    <Form className="me-2">
                        <Form.Check 
                        key={item.id}
                        type="switch"
                        id="custom-switch"
                        label={item}
                        />
                    </Form>
            ))}
            </div>
        )
    }
}

export default Toggles;