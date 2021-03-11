import React, { useState } from "react"
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
const initialFormState = { key:"",
id:null,
title: "",
content: "",
user: "",
file: "",
}
const [currentPitch, setCurrentPitch] = useState(initialFormState)

const editRow = (id) => {
  console.log(id)
  setCurrentPitch({ id: pitchs[id]._id, title: pitchs[id].title, content: pitchs[id].content, user: pitchs[id].user, file: pitchs[id].file })
  console.log(currentPitch)
}

const updatePitch = async (id, updatedPitch) => {
  await axios.post("http://localhost:5000/pitchs/update/" + id, updatedPitch)
  setPitchs(pitchs.map((pitch) => (pitch.id === id ? updatedPitch : pitch)))
  console.log(id)
  console.log(updatedPitch)
  
}
// }


axios.get('http://localhost:5000/pitchs', {timeout: 20000})
.then(res => {
  setPitchs(res.data)
  console.log(res.data)
})
.catch(error => console.log(error))


function addPitch(newPitch) { 
    setPitchs(prevPitchs => {
      return [...prevPitchs, newPitch];
    },
    );
  
}


const deletePost = async (id) => {
  // e.preventDefault();
  // try {
    await axios.delete("http://localhost:5000/pitchs/" + pitchs[id]._id)
    .then (res =>  console.log(res.data))
    
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
