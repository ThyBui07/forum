import React, { Component } from 'react';
//import { useState, useEffect } from "react";

class Home extends Component {
   constructor(props) {
    super(props);
   
    this.state = {
        items: [],
        DataisLoaded: false
    };
   }
   componentDidMount() {
    fetch(
"https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((json) => {
            //console.log(json)
            this.setState({
                items: json,
                DataisLoaded: true
            });
        })
}
    render() {
        const { items } = this.state;
        return (
            <div>
                <h1> Fetch data from an api in react </h1>  {
                items.map((item) => ( 
                <ol key = { item.id } >
                    User_Name: { item.username }, 
                    Full_Name: { item.name }, 
                    User_Email: { item.email } 
                    </ol>
                ))
            }
            </div>
        )
    }
}

export default Home;


// export default function App() {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
   
//     useEffect(() => {
//      fetch(`https://jsonplaceholder.typicode.com/posts`)
//       .then((response) => console.log(response));
//     }, []);
   
//     return <div className="App">App</div>;
//    }