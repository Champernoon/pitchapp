import React, {useState, useEffect}  from "react"
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function Edit(props) {

    const [isExpanded, setExpanded] = useState(false);
    const [note, setNote] = useState(props.currentPitch);


function handleChange(e) {
        const { name, value } = e.target

        setNote(prevValue => {
        return {
          ...prevValue, 
          [name]: value }
      })
    }
  
     

    function expand() {
        setExpanded(true);
      }
    
    

return (
    <div>
      <form className="create-note"
       onSubmit={(event) => {
        event.preventDefault()

        props.updatePitch(note.id, note)
      }}>

        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          /> 
        )}

        <textarea

          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
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




        <Zoom in={isExpanded}>
          <Fab type="submit">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}



export default Edit
