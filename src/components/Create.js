import React, {useState}  from "react"
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import axios from "axios"


function Create(props) {


  const [note, setNote] = useState({
    title: "",
    content: "",
    user: "",
    img: "",
    file:""
  });

  function postPitch(event) {
    const formData = new FormData()
    formData.append('file', note.file);
    formData.append('content', note.content);
    formData.append('title', note.title);
    formData.append('user', note.user);
    formData.append('img', note.img);
  

   props.onAdd(note)


  axios.post("http://localhost:5000/pitchs/add", formData)
      .then(res => {console.log(res.data)})
      .catch(error => {console.log(error.response)})   

    // setNote({
    //   title: "",
    //   content: "",
    //   user: "",
    //   img: "",
    //   file:"",

    // });
    event.preventDefault();
    
    console.log(note);

  }


  function handleChange(event) {
    const { name, value } = event.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };

})}

function handlePhoto(e) {
  console.log(e.target.file)
  setNote({...note, file: e.target.files[0]});
}


  return (
    <div>
      <form className="create-note" encType='multipart/form-data'  onSubmit={postPitch}>
        
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

          <Fab type="submit" >
            <AddIcon />
          </Fab>
      </form>
    </div>
  );
}



export default Create



// export default class  Create extends Component {
//   constructor(props)  {

// super(props);

// this.onChangeUser = this.onChangeUser.bind(this);
// this.onChangeTitle= this.onChangeTitle.bind(this);
// this.onChangeContent = this.onChangeContent.bind(this);
// this.onChangeImg = this.onChangeImg.bind(this);
// this.onSubmit = this.onSubmit.bind(this);


// this.state = {
//   title: "",
//   content: "",
//   user: "",
//   img: ""}
// }


// onChangeTitle(e){
//   this.setState({
//     title: e.target.value
//   })
// }

// onChangeContent(e) {
//   this.setState({
//     content: e.target.value
//   })
// }

// onChangeUser(e) {
//   this.setState({
//     user: e.target.value
//   })
// }

// onChangeImg(e) {
//   this.setState({
//     img: e.target.value
//   })
// }

// onSubmit(e) {
//   e.preventDefault();

//   const exercise = {
//     title: this.state.title,
//     content: this.state.user,
//     user: this.state.user,
//     img: this.state.img
//   }

//   console.log(exercise);

//   axios.post('http://localhost:5000/add', exercise)
//     .then(res => console.log(res.data));

//   window.location = '/';
// }
  
// render() { 
//       return (
//         <div>
//           <form onSubmit={this.onSubmit} className="create-note">
            
//               <input
//                 name="title"
//                 className="form-control"
//                 onChange={this.onChangeTitle}
//                 value={this.state.title}
//                 placeholder="Title"
//               /> 
//             )
    
//             <textarea
//               name="content"
//               onChange={this.onChangeContent}
//               value={this.state.content}
//               placeholder="Take a note..."
//             />
//             <input
//                 name="user"
//                 onChange={this.onChangeUser}
//                 value={this.state.user}
//                 placeholder="Title"
//               />
//               <input
//                 name="img"
//                 onChange={this.onChangeImg}
//                 value={this.state.img}
//                 placeholder="Title"
//               />
  
//   <div className="form-group">
//           <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
//         </div>

//           </form>
//         </div>
//       );
//     }
// }
