const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = require('../config/secrets.js');
const Users = require('../users/users-model.js');
const Role = require("./roles-model");
const restricted = require('./restricted-middleware');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/roles", restricted, (req, res) => {
  console.log(req.body);
  Role.add(req.body)
    .then(newRole => {
      res.status(201).json(newRole);
    })
    .catch(err => {
      res.status(500).json({ error: "failed to add ticket" });
    });
});

router.get("/roles", restricted, (req, res) => {
  Role.find()
    .then(role => {
      res.json(role);
    })
    .catch(err => res.send(err));
});


function generateToken(user) {
  const payload = {
    subject: user.id, // subject in payload is what the token is about
    username: user.username,
    // ...otherData
  };

  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, secret.jwtSecret, options)
}

module.exports = router;
