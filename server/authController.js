const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const {username, email, password} = req.body
        const found = await db.find_user([username])
        if (+found[0].count !== 0) {
            return res.status(409).send({message: 'Username is taken'})
        }
        const user_id = await db.add_user_auth({username, email})
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        db.add_hash({user_id: user_id[0].user_id, hash})
        req.session.user = {user_id: user_id[0].user_id, username, email}
        res.status(201).send({message: 'Logged In', user: req.session.user})
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        const found = await db.find_user([username])
        if (+found[0].count === 0) {
        return res.status(401).send({message: 'An account with that username does not exist'})
        }
        const foundUser = await db.find_hash([username])
        const {hash, user_id, profile_img, email, is_admin, profile_id} = foundUser[0]
        const result = bcrypt.compareSync(password, hash)
        if (!result) {
        return res.status(401).send({message: 'Password incorrect'})
        }
        req.session.user = {user_id, username, profile_img, email, is_admin, profile_id}
        res.status(200).send({message: 'Logged in', user: req.session.user})
    },
    logout: (req, res) => {
        req.session.destroy()
        res.status(200).send({message: 'Logged out'})
    }, 
    getUser: (req, res) => {
        res.status(200).send(req.session.user)
    }, 
    updateProfile: (req, res) => {
        const db = req.app.get('db')
        const { email, profile_img, user_id} = req.body
        db.update_profile({ email, profile_img, user_id})
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            res.status(500).send('something went wront with updateProfile')
            console.log(err)
        })
    }
} 