import { useState } from "react";


function Signin() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [message, setMessage] = useState("");
    // eaders.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
    // headers.append('Origin','http://localhost:3000');

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
              email: email,
              mobileNumber: mobileNumber,
            }),
          }).then((res) => res.json())
          .then((json)=> console.log(json));
          
          if (res.status === 200) {
           
            setName("");
            setEmail("");
            setMobileNumber("");
            setMessage("User created successfully");
          } else {
            setMessage("Some error occured");
          }
        } catch (err) {
          console.log(err);
        }
      };



    return (
        <div >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={mobileNumber}
          placeholder="Mobile Number"
          onChange={(e) => setMobileNumber(e.target.value)}
        />

        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
    );
}

export default Signin;