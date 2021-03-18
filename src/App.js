import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom";
import Create from "./components/Create"
import Header from "./components/Header"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import axios from "axios"
import Pitch from "./components/Pitch"
import Edit from "./components/Edit"
import Footer from "./components/Footer"


function App() {


const [pitchs, setPitchs] = useState([])
const [block, setBlock] = useState (true)
const initialFormState = {
id: "",
title: "",
content: "",
user: "",
img: "",
file: "",
}
const [currentPitch, setCurrentPitch] = useState(initialFormState)

const editRow = (id) => {
  console.log(id)
  setCurrentPitch({ id: pitchs[id]._id, img: pitchs[id].img, title: pitchs[id].title, content: pitchs[id].content, user: pitchs[id].user, file: pitchs[id].file })
  console.log(currentPitch)
}

const updatePitch = async (id, updatedPitch) => {
  await axios.post("http://localhost:5000/pitchs/update/" + id, updatedPitch)
  setBlock(false)
  setPitchs(pitchs.map((pitch) => (pitch.id === id ? updatedPitch : pitch)))
  console.log(id)
  
}
// }


const displayList = async() => {
  await axios.get('http://localhost:5000/pitchs')
  .then(res => {
    setPitchs(res.data)
    setBlock(true)
    console.log("lol")
  })
  .catch(error => console.log(error))
}


useEffect(() => {
displayList()}, [block])



function addPitch(newPitch) { 
  setBlock(false)
    setPitchs(prevPitchs => {
      return [...prevPitchs, newPitch];
    },
    )
}


const deletePost = async (id) => {
  // e.preventDefault();
  // try {
    await axios.delete("http://localhost:5000/pitchs/" + pitchs[id]._id)
    .then (res =>  console.log(res.data))
    setBlock(false)
    setPitchs(prevNotes => {
        return prevNotes.filter((noteItem, index) => {
          return index !== pitchs.id;
        });
      });
    
    }

  //   writeStatus("Post successfully deleted");
  //   setTimeout(() => writeStatus(""), 3000);
  // } catch (err) {
  //   writeStatus("Post deletion failed");
  // }


  return (
    <Router>
      <Header />
    
      <Route exact path="/">
<div>
{pitchs.map((noteItem, index) => {
          return (
            
            <Pitch
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              file={noteItem.file}
              onDelete={deletePost}
              editRow={editRow}
              value={noteItem.value}
            />
        
          );
        })}
        <Footer />

</div>


)
   </Route>

      <Route path="/create"> <Create onAdd={addPitch}
 /></Route>

<Route path="/update/:id">      
<Edit
        updatePitch={updatePitch}
        currentPitch={currentPitch}
      />
</Route>
</Router>


  );

}

export default App;
