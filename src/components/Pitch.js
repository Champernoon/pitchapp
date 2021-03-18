import React, {useState, useEffect} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import {Link} from "react-router-dom"



function Pitch(props) {
 

  function handleClick() {
   props.onDelete(props.id);
  }

  function handleEdit() {
    props.editRow(props.id);
    console.log(props.id)
   }
 

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
{/* /* Here I tried to display at least one individual image from the image folder but it keeps trying to access it from localhost3000 */}
<img src={props.file} alt="marchepo" width="50px" height="50px"/>

      <button onClick={handleClick} >
        <DeleteIcon />
      </button>
      <button   onClick={handleEdit}>
      <Link to="/update/:id"><EditIcon /></Link>
      </button>
    </div>
  )
}

export default Pitch;