import axios from 'axios';

const API_URL = {{project.NODE_ENV}}+"/api/user" ;



export const getUserInfo = async (token) => {
  try {
    console.log("API_URL:", API_URL); // Log del valore di API_URL
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
