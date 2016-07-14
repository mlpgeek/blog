var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('posts/post');
});

router.get('/:id', function(req, res, next) {
    res.render('posts/detail', { output: req.params.id });
});

router.post('/submit', function(req, res, next) {
    var id = req.body.id;
    res.redirect('/post/' + id);
});

module.exports = router;
