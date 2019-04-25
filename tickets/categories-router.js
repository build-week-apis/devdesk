const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const role = require('../auth/permission')
const secret = require("../config/secrets.js");
const Users = require("../users/users-model.js");
const Cat = require("./categories-model");
const restricted = require("../auth/restricted-middleware");
const db = require('../data/dbConfig.js');

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

router.get("/", restricted, (req, res) => {
  Cat.find()
    .then(cat => {
      res.json(cat);
    })
    .catch(err => res.send(err));
});

router.get("/:id", restricted, async (req, res) => {
  try {
    const category = await Cat.findById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", restricted, async (req, res) => {
  try {
    const count = await db("categories")
      .where({ id: req.params.id })
      .update(req.body);
      

    if (count > 0) {
      console.log(count);
      const category = await Cat.findById(req.params.id);

      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {}
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await db('categories')
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});

module.exports = router;
