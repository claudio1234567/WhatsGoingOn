import axios from 'axios';
require('dotenv').config();

const API_URL = process.env.REACT_APP_API_URL+"/api/user" ;

export const getUserInfo = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/userinfo`, {
      headers: { 'auth-token': token }
    });
    if (response.status === 200) {
        console.log('User info:', response); // Log delle informazioni dell'utente
      return response.json(); // Assicurati di usare .data con axios per ottenere il corpo della risposta
    } else {
      // Gestisci altri status code qui
      throw new Error(`Errore con status code: ${response.status}`);
    }
  } catch (error) {
    // Gestisci errori di rete o errori lanciati dal blocco if
    console.error('Errore durante la richiesta:', error);
    throw error; // Rilancia l'errore se necessario o gestiscilo come preferisci
  }
};
