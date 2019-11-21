require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require('express-session')
const ctrl = require("./controller");
const authCtrl = require('./authController')
const stripe = require('stripe')('sk_test_RPLLSE0aurAkt6mYLaDN4aae00C2CrvnUm')

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
app.get('/api/users/leaderboard', ctrl.getLeaderboard)

// AUTH END POINTS 
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/getUser', authCtrl.getUser)
app.put('/auth/updateProfile', authCtrl.updateProfile)

// TEST END POINT
// app.post("/checkout", async (req, res) => {
//     console.log("Request:", req.body);

//     let error;
//     let status;
//     try {
//         const { product, token } = req.body;

//         const customer = await stripe.customers.create({
//         email: token.email,
//         source: token.id
//         });

//         const idempotency_key = uuid();
//         const charge = await stripe.charges.create(
//         {
//             amount: product.price * 100,
//             currency: "usd",
//             customer: customer.id,
//             receipt_email: token.email,
//             description: `Purchased the sub`,
//             shipping: {
//             name: token.card.name,
//             address: {
//                 line1: token.card.address_line1,
//                 line2: token.card.address_line2,
//                 city: token.card.address_city,
//                 country: token.card.address_country,
//                 postal_code: token.card.address_zip
//             }
//             }
//         },
//         {
//             idempotency_key
//         }
//         );
//         console.log("Charge:", { charge });
//         status = "success";
//     } catch (error) {
//         console.error("Error:", error);
//         status = "failure";
//     }

//     res.json({ error, status });
//     });
//

massive(CONNECTION_STRING)
.then(dbInstance => {
    app.set("db", dbInstance);
    console.log("Database connected.")
    app.listen(SERVER_PORT, () => {
        console.log(`Server is listening on port ${SERVER_PORT}.`)
    });
})
.catch(err => console.log(err));