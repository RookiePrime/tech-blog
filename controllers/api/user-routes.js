const router = require('express').Router();
const { User } = require('../../models');

// Get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get a single user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'There is no user by that id.' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a user
router.post('/', (req, res) => {
    // Expects {username: 'blahblah', email: 'blahblah@blah.blah', password: 'passblah'}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.user_id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData)
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Login to user account
router.post('/login', (req, res) => {

    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'There is no user with that email address.' });
                return;
            }
            
            const correctPassword = dbUserData.checkPassword(req.body.password);

            if (!correctPassword) {
                res.status(400).json({ message: 'Incorrect password!' });
                return;
            }

            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json({ user: dbUserData, message: 'You are now logged in.' });
            });
        });
});

// Logout of user account
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Update the user
router.put('/:id', (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'There is no user by that id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete a user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'There is no user by that id.' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;