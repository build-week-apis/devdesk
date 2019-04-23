const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = require('../config/secrets.js');
const Users = require('../users/users-model.js');
const Cat = require('./categories-model');
const restricted = require('../auth/restricted-middleware');

// for endpoints beginning with /api/auth


router.post("/", restricted, (req, res) => {
  console.log(req.body);
    Cat.add(req.body)
      .then(newTicket => {
        res.status(201).json(newTicket);
      })
      .catch(err => {
        res.status(500).json({ error: "failed to add ticket" });
      });
});

router.get('/', restricted, (req, res) => {
  Cat.find()
    .then(cat => {
      res.json(cat);
    })
    .catch(err => res.send(err));
});


module.exports = router;
