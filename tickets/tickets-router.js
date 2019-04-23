const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = require('../config/secrets.js');
const Users = require('../users/users-model.js');
const Tickets = require('./tickets-model');
const restricted = require('../auth/restricted-middleware');

// for endpoints beginning with /api/auth


router.post("/", (req, res) => {
  console.log(req.body);
    Tickets.add(req.body)
      .then(newTicket => {
        res.status(201).json(newTicket);
      })
      .catch(err => {
        res.status(500).json({ error: "failed to add ticket" });
      });
});

router.get('/', restricted, (req, res) => {
  Tickets.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     let users = await db('users').where('id', id).first();
//     let tickets = await db('tickets').where('student_id', id);
//     let projAction = {
//       id: users.id,
//       username: users.username,
//       role: users.role,
//       created_at: users.created_at,
//       categories: categories.map(i => {
//         return {
//           id: i.id
//         }
//       })
//     }
//     res.status(200).json(projAction);
//   } catch (e) {
//     res.status(500).json({error: "error"});
//   }
// });




module.exports = router;
