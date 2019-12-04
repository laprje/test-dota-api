const path = require('path');

require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require('express-session')
const ctrl = require("./controller");
const authCtrl = require('./authController')
const stripeLoader = require('stripe')

const app = express();

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, STRIPE_SECRET} = process.env;

app.use( express.static( `${__dirname}/../build` ));

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
app.get('/api/users/leaderboard', ctrl.getLeaderboard)
app.get('/api/followed', ctrl.getFollowedUsers)
app.post('/api/followed/users', ctrl.getFollowedAccountId)
app.post('/api/isFollowing', ctrl.isFollowing)

// AUTH END POINTS 
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/getUser', authCtrl.getUser)
app.put('/auth/updateProfile', authCtrl.updateProfile)
app.post('/auth/users/follow/:id', authCtrl.followUser)
app.post('/auth/users/unfollow/:id', authCtrl.unFollowUser)


// SWIPE ENDPOINTS

const stripe = new stripeLoader(STRIPE_SECRET);

const charge = (token, amt) => {
    return stripe.charges.create({
        amount: +(amt * 100),
        currency: 'usd',
        source: token,
        description: 'Statement Description'
    })
} 

app.post("/api/donate", async (req, res) => {
    console.log(req.body)
    try {
        let data = await charge(req.body.token.id, req.body.amount);
        console.log(data)
        res.send("Charged!");
    } catch(e) {
        console.log(e)
        res.status(500);
    }
}) 


massive(CONNECTION_STRING)
.then(dbInstance => {
    app.set("db", dbInstance);
    console.log("Database connected.")
    app.listen(SERVER_PORT, () => {
        console.log(`Server is listening on port ${SERVER_PORT}.`)
    });
})
.catch(err => console.log(err));