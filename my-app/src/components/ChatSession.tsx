import React, { useState } from 'react';
import { IconButton, TextField, Button, Menu, MenuItem } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CloseIcon from '@mui/icons-material/Close';
import { Send } from '@mui/icons-material';
import './ChatSessionsScreen.css';

const ChatSessionsScreen = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'message', headerName: 'Message', width: 300 },
  ];

  const [showChatBox, setShowChatBox] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([
    { id: 1, message: 'Sample message 1' },
    { id: 2, message: 'Sample message 2' },
  ]);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleRowClick = (params: any) => {
    console.log('Row clicked:', params.row);
    setShowChatBox(true);
  };

  const handleNewChatClick = () => {
    console.log('New Chat button clicked');
    setShowChatBox(true);
  };

  const handleCloseChatClick = () => {
    setShowChatBox(false);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSendClick = () => {
    const newId = messages.length + 1;
    const newMessageObj = { id: newId, message: newMessage };
    setMessages([...messages, newMessageObj]);
    setNewMessage('');

    // Set a mockup response
    const response = `Mockup response to: ${newMessage}`;
    setResponseMessage(response);
  };

  const handleActionsMenuClick = () => {
    setShowActionsMenu(true);
  };

  const handleActionsMenuClose = () => {
    setShowActionsMenu(false);
  };

  return (
    <div className="chat-sessions-container">
      <h1>Chat Sessions</h1>
      <div className="search-bar">
        <TextField label="Search" variant="outlined" />
      </div>
      <div className="new-chat-button-container">
        <Button variant="contained" color="primary" onClick={handleNewChatClick}>
          New Chat
        </Button>
      </div>
      <div className="datagrid-container">
        <DataGrid
          rows={messages}
          columns={columns}
          autoHeight
          checkboxSelection={false}
          components={{
            Toolbar: GridToolbar,
          }}
          onRowClick={handleRowClick}
        />
      </div>
 
      {showChatBox && (
        <div className="chat-popup-container">
          <div className="chat-popup-content">
          <div className="chat-header">
            <h2>Chat Box Title</h2>
            <IconButton className="close-button" onClick={handleCloseChatClick}>
              <CloseIcon />
            </IconButton>
          </div>
            <div className="chat-messages-container">
              {messages.map((message) => (
                <div className="message-row" key={message.id}>
                  <div className="message-text">{message.message}</div>
                </div>
              ))}
              {responseMessage && (
                <div className="message-row">
                  <div className="message-text">{responseMessage}</div>
                  <div className="message-actions">
                    <IconButton>
                      {/* Thumb Up Icon */}
                    </IconButton>
                    <IconButton>
                      {/* Thumb Down Icon */}
                    </IconButton>
                    <IconButton>
                      {/* Copy Icon */}
                    </IconButton>
                  </div>
                </div>
              )}
            </div>
            <div className="message-input-container">
              <TextField
                label="Type a message"
                variant="outlined"
                value={newMessage}
                onChange={handleMessageChange}
              />
              <IconButton onClick={handleActionsMenuClick}>
                +
              </IconButton>
              <IconButton onClick={handleSendClick}>
                <Send />
              </IconButton>
            </div>
            <IconButton className="close-button" onClick={handleCloseChatClick}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      )}
      <Menu
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        anchorEl={showActionsMenu ? document.body : null}
        open={Boolean(showActionsMenu)}
        onClose={handleActionsMenuClose}
      >
        <MenuItem onClick={handleActionsMenuClose}>Upload File</MenuItem>
        <MenuItem onClick={handleActionsMenuClose}>Predefined Prompt 1</MenuItem>
        <MenuItem onClick={handleActionsMenuClose}>Predefined Prompt 2</MenuItem>
      </Menu>
    </div>
  );
};

export default ChatSessionsScreen;
