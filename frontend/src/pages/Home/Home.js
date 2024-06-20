import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    navigate('/login');
  };

  const chats = [
    { id: 1, name: 'User 1', lastMessage: 'Hello!' },
    { id: 2, name: 'User 2', lastMessage: 'How are you?' },
    // Aggiungi altre chat qui
  ];

  const allMessages = {
    1: [
      { sender: 'User 1', text: 'Hello!', timestamp: '10:00 AM' },
      { sender: 'You', text: 'Hi! How are you?', timestamp: '10:02 AM' },
    ],
    2: [
      { sender: 'User 2', text: 'How are you?', timestamp: '11:00 AM' },
      { sender: 'You', text: 'I am good, thanks!', timestamp: '11:02 AM' },
    ],
    // Aggiungi altri messaggi per altre chat qui
  };

  const messages = selectedChat ? allMessages[selectedChat.id] : [];

  return (
    <Box className="home-container" sx={{ display: 'flex', height: '100vh' }}>
      {/* Lista delle Chat */}
      <Box sx={{ width: '30%', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
        <List>
          {chats.map(chat => (
            <React.Fragment key={chat.id}>
              <ListItem onClick={() => setSelectedChat(chat)}>
                <ListItemText primary={chat.name} secondary={chat.lastMessage} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Conversazione Selezionata */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
          {selectedChat ? (
            messages.map((msg, index) => (
              <Box key={index} sx={{ marginBottom: '1rem' }}>
                <Box
                  sx={{
                    backgroundColor: msg.sender === 'You' ? '#e1ffc7' : '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: '10px',
                    alignSelf: msg.sender === 'You' ? 'flex-end' : 'flex-start',
                    maxWidth: '60%',
                  }}
                >
                  <strong>{msg.sender}</strong>: {msg.text}
                  <Box sx={{ fontSize: '0.75rem', color: '#999', marginTop: '0.5rem' }}>
                    {msg.timestamp}
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>Select a chat to start messaging</Box>
          )}
        </Box>
        {/* Pulsante di Logout */}
        <Box sx={{ padding: '1rem', borderTop: '1px solid #ccc' }}>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;