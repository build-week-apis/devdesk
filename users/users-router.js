const router = require('express').Router();
const db = require('../data/dbConfig');
const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let users = await db('users').where('id', id).first();
    let tickets = await db('tickets').where('student_id', id);
    let projAction = {
      id: users.id,
      username: users.username,
      role: users.role,
      created_at: users.created_at
    }
    res.status(200).json(projAction);
  } catch (e) {
    res.status(500).json({error: "error"});
  }
});

router.put("/:id", restricted, async (req, res) => {
  try {
    const count = await db("categories")
      .where({ id: req.params.id })
      .update(req.body.name);
      

    if (count > 0) {
      console.log(count);
      const category = await Cat.findById(req.params.id);

      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {}
});

router.delete('/:id', restricted, async (req, res) => {
  try {
    const count = await db('users')
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});

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
