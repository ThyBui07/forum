import { useState } from "react";
import '../Components/css/LoginSignup.scss'
import '../Components/css/Buttons.scss'
import forumImg from '../Components/img/signin.png'
import { useNavigate } from "react-router-dom";



function Login() {
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    let HandleAuth = async(e) => {
      fetch("http://localhost:8080/login")
        .then((res) => res.json())
        .then((json) => {
          console.log(json)
          if (json === true) {
            sessionStorage.setItem("loggedIn", true);
            navigate('/', { replace: true });
          console.log("Login successful")
          } else {
            sessionStorage.setItem("loggedIn", false);
            setMessage("Username or password incorrect");
            console.log("U or P incorrect")
          }
        });
    }
   
    let HandleSubmit = async (e) => {
        e.preventDefault();
        try {
          let response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers:{
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          }).then((response) => response.json())
          .then((json)=> console.log(json));
          
          if (response.status === 200) {
           
            setName("");
            setPassword("");
            setMessage("User logged in successfully");
          } else {
            setMessage("Some error occured");
          }
        } catch (err) {
          console.log(err);
        }
        HandleAuth();
      };
    return (
      <div >
        <div className="login-flex-container">
          <div className="login-column" id="right">
            <img alt="forum img" className="forumImg" src={forumImg} />
          </div>
          <div className="login-column" id="left">
            <div className="heading">
              <h1 className="heading-title" id="heading-title-login">Login</h1>
            </div>   
            <div className="form-area">
              <form onSubmit={HandleSubmit}>
                <h3 className="username-title">Username</h3>
                <input
                  type="text"
                  value={username}
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
                 <a href="/signup"><h5>Sign Up</h5></a>
                </div>
                
                <div className="message">{message ? <p>{message}</p> : null}</div>
              </form>
              </div>
          </div>   
        </div>
      </div>
    );
}

export default Login;




