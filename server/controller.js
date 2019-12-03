
module.exports = {
    getUsers: (req, res) => {
        const db = req.app.get('db');
        db.get_users()
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            console.log({err});   
        })
    },
    oneUser(req, res) {
        const db = req.app.get('db')
        const account_id_num = req.params.id
        const account_id = account_id_num.toString()
        db.one_user(account_id)
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            res.status(500).send('oops.')
            console.log(err)
        })
    }, 
    addUser(req, res) {
        const db = req.app.get('db')
        const { account_id } = req.body;

        db.add_user([account_id])
        .then(() => {
            res.sendStatus(200);
        })
        .catch(err => {
            res.status(500).send('something wrong with add_user.')
            console.log(err)
        })
    },
    deleteUser(req, res) {
        const db = req.app.get('db');
        db.delete_user(req.params.id)
        .then(result => {
            res.status(200).send(result)
        }).catch(err => console.log(err))
    }, 
    getLeaderboard(req, res) {
        const db = req.app.get('db');
        db.get_leaderboard()
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            console.log({err});   
        })
    },
    getFollowedUsers: (req, res) => {
        const db = req.app.get('db');
        const { user_id } = req.session.user
        db.get_followed_users([user_id])
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            console.log({err});   
        })
    },
    getFollowedAccountId: async (req, res) => {
        const db = req.app.get('db');
        const {user_id} = req.body
        await db.get_followed_account_id([user_id])
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            console.log({err})
        })

    },
}