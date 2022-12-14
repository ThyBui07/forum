import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from '../Components/TopNav'
//import '../Components/css/CreatePost.css';

//import { useState, useEffect } from "react";



function CreatePost() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategory] = useState([]);
  const [message, setMessage] = useState("");
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();
  


    fetch("http://localhost:8080/").then(
      function(u){ return u.json();}
    ).then(
      function(json){
        setCats(json)
      }
    );
 

  let HandlePostCreation = async(e) => {
    fetch("http://localhost:8080/create-post")
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        if (json === true) {
          navigate('/', { replace: true });
        console.log("Post successful")
        } else {
          setMessage("Invalid Post");
          console.log("Error with posting post.")
        }
      });
  }

  let HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:8080/create-post", {
        method: "POST",
        headers:{
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify({
          title: title,
          content: content,
          categories: categories,
        }),
      }).then((response) => response.json())
      .then((json)=> console.log(json));
      
    } catch (err) {
      console.log(err);
    }
    HandlePostCreation();
  };

    return (
          <div>
            <TopNav />
            <div className="main">
            <h1 className="headertitle">Create a post</h1>
            <div className="contentArea">
              <div className="titleArea">
              Title: <input value={title} className="titleTextArea" id="postTitle" onChange={(e) => setTitle(e.target.value)}></input>
              </div>
              <div className="categoryArea">
                Category: <div>
                {cats.map((item) => (
                    <div key={item.id}>
                      <input value={categories} type="checkbox" onChange={(e) => setCategory(e.target.value)} />
                      <span>{item.title}</span>
                    </div>
             ))}
    </div>
              </div>
              <div className="textarea">
              <textarea value={content} className="myTextarea" id="myTextarea" placeholder="Type something" onChange={(e) => setContent(e.target.value)}></textarea>
            </div>
            <div className="buttonarea">
              <DiscardBtn />
              <button className="postBtn" onSubmit={(HandleSubmit)}>Post</button>
            </div>
            <div className="message">{message ? <p>{message}</p> : null}</div>
            </div>
           
           
          </div> 
          </div> 
    );
  }

export default CreatePost;

/* function PostTitleInput() {
  

  return  <textarea className="titleTextArea" id="postTitle"></textarea>
} */

/* function PostCategoryInput() {
  const { items } = this.state;


  return (
    <div>
      {items.map((item) => (
      <input className="postCategories" onChange={(e) => setCategory(e.target.value)}>{item.title}</input> 
            ))}
    </div>
      
  );
} */

/* function TextEditor() {

  return   <textarea className="myTextarea" id="myTextarea" placeholder="Type something" onChange={(e) => setContent(e.target.value)}></textarea>
}
 */
/* function PostBtn() {
  return <button className="postBtn" onSubmit={(HandleSubmit)}>Post</button>
} */

function DiscardBtn() {
  return <button className="discardBtn">Discard</button>
}

