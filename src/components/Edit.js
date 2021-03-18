import React, {useState, useEffect}  from "react"
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { withRouter } from 'react-router-dom'

function Edit(props) {

    const [note, setNote] = useState(props.currentPitch);


function handleChange(e) {
        const { name, value } = e.target

        setNote(prevValue => {
        return {
          ...prevValue, 
          [name]: value }
      })
    }
  
     


    function handlePhoto(e) {
      console.log(e.target.files[0])
      setNote({...note, file: e.target.files[0]});
    }
    
    

return (
    <div>
      <form className="create-note"
       onSubmit={(event) => {
        event.preventDefault()
        props.history.push('/')
        const formData = new FormData()
        formData.append('file', note.file);
        formData.append('content', note.content);
        formData.append('title', note.title);
        formData.append('user', note.user);
        formData.append('img', note.img);

        console.log(note.file.name)



        props.updatePitch(note.id, note)
        console.log(note.id, note)
      }}>

        
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          /> 
        

        <textarea

          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows= "3" 
        />
        <input
            name="user"
            onChange={handleChange}
            value={note.user}
            placeholder="Title"
          />
          <input

            name="img"
            onChange={handleChange}
            value={note.img}
            placeholder="Title"
          />



<input type="file"
          name="file"
          onChange={handlePhoto}
          accept=".png, .jpg, .jpeg"
          />





          <Fab type="submit">
            <AddIcon />
          </Fab>
      </form>
    </div>
  );
}



export default withRouter(Edit)



// import React, {useState, useEffect}  from "react"
// import AddIcon from "@material-ui/icons/Add";
// import Fab from "@material-ui/core/Fab";
// import { withRouter } from 'react-router-dom'

// function Edit(props) {

//     const [note, setNote] = useState(props.currentPitch);


// function handleChange(e) {
//         const { name, value } = e.target

//         setNote(prevValue => {
//         return {
//           ...prevValue, 
//           [name]: value }
//       })
//     }
  
     
//     function handlePhoto(e) {
//       console.log(e.target.files[0])
//       setNote({...note, file: e.target.files[0]});
//     }
    
// function editPitch(e) {
//   const formData = new FormData()
//   formData.append('file', note.file);
//   formData.append('content', note.content);
//   formData.append('title', note.title);
//   formData.append('user', note.user);
//   formData.append('img', note.img);
//   console.log(formData)

//   e.preventDefault();
//   props.history.push('/')
//   props.updatePitch(note.id, note)

// }

// return (
//     <div>
//       <form className="create-note"
//        onSubmit={editPitch}
        
//       >

// <input
//             name="title"
//             onChange={handleChange}
//             value={note.title}
//             placeholder="Title"
//           /> 

//         <textarea


//           name="content"
//           onChange={handleChange}
//           value={note.content}
//           placeholder="Take a note..."
//         />
//         <input

//             name="user"
//             onChange={handleChange}
//             value={note.user}
//             placeholder="Title"
//           />
//           <input


//             name="img"
//             onChange={handleChange}
//             value={note.img}
//             placeholder="Title"
//           />

// <input type="file"
//           name="file"
//           onChange={handlePhoto}
//           accept=".png, .jpg, .jpeg"
//           />




//           <Fab type="submit">
//             <AddIcon />
//           </Fab>
//       </form>
//     </div>
//   );
// }



// export default withRouter(Edit)
