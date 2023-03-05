import React, {useState} from "react";
import {useAuthContext} from "../hooks/useAuthContext";

const ImageUpload = () => {
  const {user} = useAuthContext();
  const [image, setImage] = useState({});

  const send = (event) => {
    setImage(event.target.files[0]);
  };

  const sendImage = () => {
    const formdata = new FormData();
    formdata.append('file', image);

    fetch('/api/user/uploadFile', {
      method: 'POST',
      body: formdata,
      headers: {
        'Authorization': "Bearer " + user.token,
      }
    })

      .then((res) => {
        res.text().then((text) => {
          console.log(text);
          window.location.reload();
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteImage = () => {
    const formdata = new FormData();
    formdata.append('file', image);

    fetch('/api/user/profilePic', {
      method: 'DELETE',
      body: formdata,
      headers: {
        'Authorization': "Bearer " + user.token,
      }
    })

      .then((res) => {
        res.text().then((text) => {
          console.log(text);
          window.location.reload();
        })
      })
  }


  return (
    <div className={"upload"}>
      <label>Upload a profile picture</label>
      <input type="file" onChange={send}></input>
      <button onClick={sendImage}>Upload</button>
      <label>Delete profile picture</label>
      <button onClick={deleteImage}>Delete</button>
    </div>
  )
}

export default ImageUpload;

