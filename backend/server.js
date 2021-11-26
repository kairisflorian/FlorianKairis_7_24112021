const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
var corsOptions = {
    origin: "http://localhost:8081"
};

const db = require("./models/connectionDb");

const UserRoutes = require("./routes/users");

const app = express();

//parser les requetes de type json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors(corsOptions));

app.use("/api/users", UserRoutes);

//lancer le serveur 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT}.`);
});