import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Divider, TextField, InputAdornment, AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import './Home.css';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import {getUserInfo} from '../../api/user';


function Home() {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [userInfo, setUserInfo] = useState(null); // Inizializzazione dello stato userInfo a null

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      navigate('/login'); // Reindirizza al login se non c'è token
    } else {
        getUserInfo(token).then(data => {
        setUserInfo(data); // Imposta le informazioni dell'utente
      }).catch(error => {
        console.error('Impossibile recuperare le informazioni dell\'utente:', error);
        // Gestisci qui come preferisci, es. mostrare un messaggio, reindirizzare, etc.
      });
    }
  }, [navigate]); // Dipendenze useEffect

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    navigate('/login');
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
      <AppBar position="static">
        <Toolbar>
          <Avatar sx={{ bgcolor: 'secondary.main' }}>{userInfo ? userInfo.nome : '?'}</Avatar>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={() => { /* logic to start a new chat */ }}>
            <AddIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleMenu}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

          <TextField
      fullWidth
      variant="outlined"
      placeholder="Cerca"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{ m: 1, height: '40px', input: { padding: '10px 14px' } }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        )
      }}
    />
        <List>
          {chats.filter(chat => chat.name.toLowerCase().includes(searchTerm.toLowerCase())).map(chat => (
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

      </Box>
    </Box>
  );
}

export default Home;