const router = require('express').Router();
const { log } = require('console');
const { Post } = require('../models')

router.get('/',(req, res)=>{
  Post.findAll().then(([posts]) => {
    console.log(posts);
    res.render('homepage', {posts});
  });
});

module.exports = router;