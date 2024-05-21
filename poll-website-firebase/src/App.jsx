import { useState, useEffect } from 'react'
import './App.css'
import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

function App() {
  const [answer, setAnswer] = useState("");
  const [upvotes, setUpvotes] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form submitted");
    try {
      const docRef = await addDoc(collection(db, "users"), {
        response: answer,
        upvotes: upvotes,
      });
      console.log("created doc with id: ", docRef.id);
    } 
    catch (error) {
      console.error("Error fetching collection data: ", error)
    }
  };

  // fetch data and display it as it is being added
  // try using child_added() and ref
  useEffect(() => {
    // const ref = 
    
    // const fetchResponses = () => {

    // }
  }, [])

  const handleChange = (e) => {
    setAnswer(e.target.value);
    setUpvotes(upvotes + 1);
    // console.log("Input value: ", e.target.value);

  };


  return (
    <>
      <h1> Poll Website </h1>
      <form onSubmit={handleSubmit}> 
        <label> What is the best fast food restaurant? </label>
        <br/>
        <input type="text" onChange={handleChange}></input>
        <br/>
        <button type="submit"> Submit </button>
      </form>
    </>
  );

}

export default App
