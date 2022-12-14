import { useState } from "react";
import '../Components/css/LoginSignup.scss'
import '../Components/css/Buttons.scss'
import forumImg from '../Components/img/signin.png'

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
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
              mobileNumber: mobileNumber,
            }),
          }).then((res) => res.json())
          .then((json)=> console.log(json));
          
          if (res.status === 200) {
            setName("");
            setEmail("");
            setMobileNumber("");
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
              <h1 className="heading-title" id="heading-title-signup">Sign Up</h1>
            </div>   
            <div className="form-area">
              <form onSubmit={handleSubmit}>
                <h3 className="username-title">Username</h3>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <h3 className="email-title">Email</h3>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <h3 className="mobilenumber-title">Mobile Number</h3>
                <input
                  type="text"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                <h3 className="password-title">Password</h3>
                <input
                  id="password1"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="btn-area">
                  <button className="loginpageBtn" type="submit" >Sign Up</button>
                </div>
                <div>
                 <h5>Already a member?</h5>
                 <a href=""><h5>Login In</h5></a>
                </div>
                
                <div className="message">{message ? <p>{message}</p> : null}</div>
              </form>
              </div>
          </div>   
        </div>
      </div>
    );
}

export default Signup;




