require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require('express-session')
const ctrl = require("./controller");
const authCtrl = require('./authController')

const app = express();

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(express.json());

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))

// CONTROLLER END POINTS
app.get('/api/users', ctrl.getUsers)
app.get('/api/users/:id', ctrl.oneUser)
app.post('/api/users', ctrl.addUser)
app.delete('/api/users/:id', ctrl.deleteUser)

// AUTH END POINTS 
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)


massive(CONNECTION_STRING)
.then(dbInstance => {
    app.set("db", dbInstance);
    console.log("Database connected.")
    app.listen(SERVER_PORT, () => {
        console.log(`Server is listening on port ${SERVER_PORT}.`)
    });
})
.catch(err => console.log(err));