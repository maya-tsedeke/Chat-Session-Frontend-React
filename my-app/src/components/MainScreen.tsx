import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import './MainScreen.css';

const MainScreen = () => {
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileUpload = (event:any) => {
    // Logic to handle file upload goes here
    setFileUploaded(true);
  };

  return (
    <div className="main-container">
      <h1>Main Screen</h1>
      <div className="button-container">
        <Button variant="contained" className="logout-button">
          <Link to="/">Logout</Link>
        </Button>
        <TextField className="file-upload-input" type="file" onChange={handleFileUpload} />
        <Button variant="contained" className="chat-session-button" disabled={!fileUploaded}>
          <Link to="/chat">Chat Session</Link>
        </Button>
      </div>
    </div>
  );
};

export default MainScreen;
