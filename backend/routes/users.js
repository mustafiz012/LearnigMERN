const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getUserList').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/checkValidity/:username')
    .get(function (req, res) {
            let username = req.params.username;
            let isValid = false;
            // if (username.isEmpty()) res.json({valid: isValid});
            const query = {username: username};

            User.find(query, function (err, users) {
                if (err) {
                    isValid = true;
                } else {
                    isValid = users.length <= 0;
                }
                res.json({valid: isValid})
            })
        }
    );

router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const email = req.body.email;

    //checking if requested new username is valid
    if (username && username.length >= 3) {
        const query = {username: username};
        User.find(query, function (err, users) {
            if (err) {
                res.json({status: 500, success: false, message: 'Internal server error!', errorMessage: err})
            } else {
                if (users.length <= 0) {
                    //proceed to create new username
                    const newUser = new User({username, name, email});
                    newUser.save()
                        .then(() => res.json({status: 200, success: true, message: 'User added!'}))
                        .catch(err => res.json({
                            status: 500,
                            success: false,
                            message: 'Internal server error!',
                            errorMessage: err
                        }));
                } else {
                    res.json({status: 409, success: false, message: 'Username is already taken!'})
                }
            }
        });
    } else {
        if (username.length < 3) {
            res.json({status: 400, success: false, message: 'Number of character must be 3 or more.'})
        } else {
            res.json({status: 400, success: false, message: 'Username cannot be empty!'})
        }
    }
});

module.exports = router;