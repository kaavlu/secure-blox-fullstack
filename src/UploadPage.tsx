import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mammoth from 'mammoth';

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a document first.");
      return;
    }

    const arrayBuffer = await file.arrayBuffer();

    mammoth.extractRawText({ arrayBuffer })
      .then((result) => {
        navigate('/result', { state: { documentText: result.value } });
      })
      .catch((error) => {
        console.error("Error extracting document text:", error);
      });
  };

  return (
    <div>
      <h1>Upload a Document</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadPage;
