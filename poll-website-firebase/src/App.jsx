import { useState, useEffect } from 'react'
import './App.css'
import { db } from "./firebase";
import { addDoc, collection, getDocs, updateDoc, doc } from "firebase/firestore";

function App() {
  const [answer, setAnswer] = useState("");
  const [currData, setCurrData] = useState([]);

  // to get all previous responses
  const fetchData = async () => {
    let data = [];
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach(doc => {
      data.push({
        id: doc.id, 
        ...doc.data() // '...' is shorthand to add rest of data
      }); // we use curly brackets to signify that we are pushing an object
    });
    setCurrData(data);
  }
  
  useEffect(() => {
    fetchData();
  }, [])
  
  // to add data to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "users"), {
        response: answer,
        upvotes: 0,
      });
      console.log("created doc with id: ", docRef.id);
    } 
    catch (error) {
      console.error("Error fetching collection data: ", error)
    }
    // add this to make the response show up immediately
    fetchData();
  };

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  const upvoteResponse = async (id, currUpvotes) => {
    await updateDoc(doc(db, 'users', id), {
      upvotes: currUpvotes + 1,
    });
    fetchData();
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
      <div> 
        <h2> Previous Responses: </h2>
        {currData.map((response) => (
          <div key={response.id}> 
            <h4> {response.response} Upvotes: {response.upvotes} </h4>
            <button onClick={() => upvoteResponse(response.id, response.upvotes)}> Upvote </button>
          </div>
        ))}
      </div>
    </>
  );

}

export default App
