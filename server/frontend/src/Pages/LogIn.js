import { useState } from "react";
import '../Components/css/popuplogin.scss'
import '../Components/css/Buttons.scss'
import forumImg from '../Components/img/signin.png'

function Signin() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
   
    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers:{
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
              name: name,
              password: password,
            }),
          }).then((res) => res.json())
          .then((json)=> console.log(json));
          
          if (res.status === 200) {
           
            setName("");
            setPassword("");
            setMessage("User logged in successfully");
          } else {
            setMessage("Some error occured");
          }
        } catch (err) {
          console.log(err);
        }
      };
    return (
      <div >
        <div className="login-flex-container">
          <div className="login-column" id="right">
            <img className="forumImg" src={forumImg} />
          </div>
          <div className="login-column" id="left">
            <div className="heading">
              <h1 className="heading-title">Login</h1>
            </div>   
            <div className="form-area">
              <form onSubmit={handleSubmit}>
                <h3 className="username-title">Username</h3>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <h3 className="password-title">Password</h3>
                <input
                  id="password1"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="btn-area">
                  <button className="loginpageBtn" type="submit" >Login</button>
                </div>
                <div>
                 <h5>Not a member?</h5>
                 <a href=""><h5>Sign Up</h5></a>
                </div>
                
                <div className="message">{message ? <p>{message}</p> : null}</div>
              </form>
              </div>
          </div>   
        </div>
      </div>
    );
}

export default Signin;




