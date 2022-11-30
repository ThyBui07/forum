
import React, { Component } from 'react'
import './App.css';
import Home from './Home';


class App extends Component {
  render() {
    return (
      <Home/>
    )
  }
}

export default App;



// export default function App() {
//  const [data, setData] = useState(null);
//  const [loading, setLoading] = useState(true);
//  const [error, setError] = useState(null);

//  useEffect(() => {
//   fetch(`https://jsonplaceholder.typicode.com/posts`)
//    .then((response) => console.log(response));
//  }, []);

//  return <div className="App">App</div>;
// }