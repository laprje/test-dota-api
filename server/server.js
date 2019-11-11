require("dotenv").config();
const express = require("express");
const massive = require("massive");
const ctrl = require("./controller");

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

app.use(express.json());

// END POINTS
app.get('/api/users', ctrl.getUsers)
app.get('/api/users/:id', ctrl.oneUser)
app.post('/api/users', ctrl.addUser)
app.delete('/api/users/:id', ctrl.deleteUser)


massive(CONNECTION_STRING)
.then(dbInstance => {
    app.set("db", dbInstance);
    console.log("database connected")
    app.listen(SERVER_PORT, () => {
        console.log(`Server is listening on port ${SERVER_PORT}.`)
    });
})
.catch(err => console.log(err));