const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//parser les requetes de type json
app.use(bodyParser.json());

//parser les requetes de type x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//route simple en test
app.get("/", (req, res) => {
    res.json({ message: "Bienvenue sur l'application." });
});

//lancer le serveur 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT}.`);
});