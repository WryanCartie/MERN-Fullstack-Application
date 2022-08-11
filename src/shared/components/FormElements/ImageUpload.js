import React, { useEffect, useRef,useState } from "react";

import Button from "./Button";

import "./ImageUpload.css";

const ImageUpload = (props) => {
  const filePickerRef = useRef();
  const[file,setFile] = useState(null)
  const[previewUrl,setPreviewUrl] = useState(null)
  const[isValid,setIsValid] = useState(false)
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const filePickedHandler = (evt) => {  
   let fileIsValid = isValid
   let pickedFile = evt.target.files[0];
    if(evt.target.files && evt.target.files.length === 1){
        let pickedFile = evt.target.files[0];
        fileIsValid = true
        setIsValid(true)
        setFile(pickedFile)
    }else{
        setIsValid(false)
    }
    props.onInput(props.id,pickedFile,fileIsValid)
  };

  useEffect(()=>{
    if(!file){
        return
    }
    const fileReader = new FileReader();
    fileReader.onload = ()=>{
        setPreviewUrl(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  },[file])

  return (
    <div className="form-control">
      <input
        ref={filePickerRef}
        id={props.id}
        onChange={filePickedHandler}
        style={{display: 'none' }}
        type="file"
        accept="jpg,png,jpeg"
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl &&<img src={previewUrl} alt="PREVIEW" />}
          {!previewUrl && <p>Please upload an image!</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
