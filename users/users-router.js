const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get('/:id', restricted, (req, res) => {
  const id = req.params.id;
  const data = req.body;
  Users.findById(id)
      .then(user => {
          res.status(200).json(user);
      })
      .catch(err => res.status(500).send(err));
})

// router.get('/:id', authorise(['admin'], ':id'),
//   async ({ params: { id } }, res) => {
    
//     const [{ password, ...user }] = await Users.get(id);
//     res.status(200).json(user);
//   }
// );

// userRouter.put('/users/:id', restricted, (req, res) => {
//   const id = req.params.id;
//   const data = req.body;
//   db.updateUser(id, data)
//       .then(updated => {
//           res.status(200).json(updated);
//       })
//       .catch(err => res.status(500).send(err));
// })

module.exports = router;
