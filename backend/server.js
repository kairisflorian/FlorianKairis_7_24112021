const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const path = require('path');


var corsOptions = {
    origin: ["http://localhost:8081"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));


// synchro sequelize
const db = require("./models");
const Roles = db.roles;
db.sequelize.sync({ alter: true }).then(() => {
    console.log("Drop and resync DB");
    initial();
});
function initial() {
    Roles.create({
        id: 1,
        name: "user"
    });
    Roles.create({
        id: 2,
        name: "moderator",
    });
    Roles.create({
        id: 3,
        name: "admin"
    });
}

// routes
app.use('/images', express.static(path.join(__dirname, 'images')));
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/posts.routes')(app);
require('./routes/like.routes')(app);



//lancer le serveur 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT}.`);
});

