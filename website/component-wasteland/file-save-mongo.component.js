import ReactDom from "react-dom";
import ReactS3 from "react-s3";
import S3FileUpload from "react-s3";
import { uploadImage } from "../src/s3";
import { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

function FileSave() {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {}, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const onSubmit = () => {
    console.log("Submitting");
    if (file) {
      uploadImage(file)
        .then((url) => {
          console.log("post action");
          console.log(file);
        })
        .catch((error) => {
          console.log("error");
        });
    }
  };

  return (
    <div>
      <div>
        <h3> File Upload </h3>
      </div>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p> Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <button onClick={onSubmit}></button>
    </div>
  );
}

export default FileSave;
