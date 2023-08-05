const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Address } = require('../models');

const withAuth = require('../utils/auth')

router.get('/', withAuth, (req, res) => {


  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'post_text',
      'title',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      Address.findAll().then((addressData) => {
        const addresses = addressData.map(address => address.get({ plain: true }));
        const posts = dbPostData.map(post => post.get({ plain: true }));
        console.log(addresses);
        res.render('dashboard', { posts, addresses, loggedIn: true });
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_text',
      'title',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'Post does not exist' });
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render('editPost', { post, loggedIn: true });
    })
    .catch(err => {

      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/editUser', withAuth, (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.session.user_id
    }
  })
    .then(dbUserData => {

      if (!dbUserData) {
        res.status(404).json({ message: 'Invalid user id' });
        return;
      }
      const user = dbUserData.get({ plain: true });
      res.render('editUser', { user, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;