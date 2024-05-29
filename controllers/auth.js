// Importo la libreria di jsonwebtoken
const jwt = require("jsonwebtoken");
// Carico le variabili d'ambiente
require("dotenv").config();
// Importo il db degli utenti
const users = require("../db/users.json");

// Creo una funzione per generare il token
const generateToken = (user) => {
    // Assegno le credenziali dell'utente ad una variabile payload
    const payload = user;
    // Creo il token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1m"});
    return token;
};



// Funzione per la home
const home = (req, res) => {
    // Estraggo le credenziali dell'utente dalla request del body
    const { username, password} = req.body;
    // Trovo la corrispondenza tra le credenziali inserite e uno degli utenti
    const user = users.find(u => u.username === username && u.password === password);
    // Se non viene trovato l'utente
    if (!user) {
        // Restituisco un errore
        res.status(404).send('Credenziali errate');
    }

    const token = generateToken(user);

    res.send(token);
    
}

module.exports = {
    generateToken,
    home
}