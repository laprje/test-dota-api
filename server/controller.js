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
        db.one_user(+req.params.id)
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            res.status(500).send('oops.')
            console.log(err)
        })
    }
}