import React, { useState } from 'react'
import './ImageUpload.css'
import { storage } from '../../services/Firebase'



const ImageUpload = () => {
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState('')
  const [preview, setPreview] = useState('')
  const [progress, setProgress] = useState(10)

  const disabled =  image === null ? true : false

  const handleChange = e => {
    if(e.target.files[0]){
      setImage(e.target.files[0]) 
      setPreview( URL.createObjectURL(e.target.files[0]) )
    }
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(url)
    alert("Url Copied")
  }

  const handleSubmit = () => {
    console.log("Uploaded")
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
    uploadTask.on('state_changed',

      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setProgress(progress)
      },
      (error) => {
        console.log(error)
      },

      () => {
        storage.ref('images').child(image.name).getDownloadURL()
          .then(url => {
            console.log(url)
            alert("Image Uploaded Successfully")
            setUrl(url)
          })
      }
    )
  }

  const imagePlace = "https://via.placeholder.com/250"

  return (
    <div className="upload-image-con">

      <div className="upload-image-div">
        <progress value={progress} max="100" />


        <label className="file">
          <input type="file" onChange={handleChange} accept="image/png, .jpeg, .jpg, image/gif" />
          <p>CHOOSE IMAGE</p>
        </label>
        <input type="text" defaultValue={image && image.name} />

      </div>

      <div className="image-display-con">

        <div className="uploaded-image">
           <img src={preview ? preview : imagePlace} alt="Uploaded" />
        </div>
        
        <button onClick={handleSubmit} disabled={disabled} >UPLOAD IMAGE</button>

        <input type="text" defaultValue={url} id="imageUrl" />

        <div className="uploaded-image">
           <img src={url ? url : imagePlace} alt="Uploaded" />
        </div>

        <button
          onClick={copyUrl}
        >
          COPY URL
        </button>
      </div>

    </div>
  )
}

export default ImageUpload