const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models/connectionDb");
const UserRoutes = require("./routes/users");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');


var corsOptions = {
    origin: ["http://localhost:8081"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));



app.use("/api/users", UserRoutes);


//lancer le serveur 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT}.`);
});