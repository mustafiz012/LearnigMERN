const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

/*router.route('/checkValidity/:username')
    .get(function (req, res) {
            const regex = new RegExp(req.params.username, 'i')
                , query = {username: regex};

            User.find(query, function (err, users) {
                let isExist = true;
                if (err) {
                    console.log(err);
                    isExist = false;
                } else {
                    console.log(users)
                }
                res.json({valid: !isExist})
            })
        }
    );*/

router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;