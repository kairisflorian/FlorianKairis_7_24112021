const express = require("express");
const bodyParser = require("body-parser");
//const db = require("./models/connectionDb");
//const UserRoutes = require("./routes/users");
//const PostRoutes = require("./routes/posts");
//const CommentRoutes = require("./routes/comments");
//const AnswerRoutes = require("./routes/answers");
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


/*
app.use("/api/users", UserRoutes);
app.use("/api/posts", PostRoutes);
app.use("/api/comments", CommentRoutes);
app.use("/api/answers", AnswerRoutes);
*/

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
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

//lancer le serveur 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT}.`);
});

