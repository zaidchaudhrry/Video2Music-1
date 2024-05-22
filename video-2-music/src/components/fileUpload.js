import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const FileUpload = ({ onUploadComplete }) => {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    axios.post('/api/upload', formData)
      .then(response => {
        setIsUploading(false);
        onUploadComplete(response.data.keywords);
      })
      .catch(error => {
        setIsUploading(false);
        console.error('Upload failed:', error);
      });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="upload-area">
      <input {...getInputProps()} />
      {isUploading ? <div className="loading-animation">Uploading...</div> : <p>Drag & drop a file or click to select</p>}
    </div>
  );
};

export default FileUpload;