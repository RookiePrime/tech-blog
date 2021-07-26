const router = require('express').Router();
const { Comment } = require('../../models');

// Get all comments
router.get('/', (req, res) => {
    Comment.findAll()
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
});

// Get a single comment
router.get('/:id', (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        }
    })
            .then(dbCommentData => {
                if (!dbCommentData) {
                    res.status(404).json({ message: 'There is no comment by that id.' });
                    return;
                }
                res.json(dbCommentData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
});

// Create a comment
router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
});

// Update a comment
router.put('/:id', (req, res) => {
    Comment.update(req.body, {
        where: {
            id: req.params.id
        }
    })
            .then(dbCommentData => {
                if (!dbCommentData) {
                    res.status(404).json({ message: 'There is no comment by that id.' });
                    return;
                }
                res.json(dbCommentData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
});

// Delete a comment
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
            .then(dbCommentData => {
                if (!dbCommentData) {
                    res.status(404).json({ message: 'There is no comment by that id '});
                    return;
                }
                res.json(dbCommentData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
});

module.exports = router;