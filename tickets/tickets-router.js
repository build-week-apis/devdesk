const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../data/dbConfig.js");

const secret = require("../config/secrets.js");
const Users = require("../users/users-model.js");
const Tickets = require("./tickets-model");
const restricted = require("../auth/restricted-middleware");

router.post("/", restricted, (req, res) => {
  console.log(req.body);
  Tickets.add(req.body)
    .then(newTicket => {
      res.status(201).json(newTicket);
    })
    .catch(err => {
      res.status(500).json({ error: "failed to add ticket" });
    });
});

router.get("/", restricted, (req, res) => {
  Tickets.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get("/:id", restricted, async (req, res) => {
  try {
    const ticket = await Tickets.findById(req.params.id);
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", restricted, async (req, res) => {
  try {
    const count = await db("tickets")
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const ticket = await db("tickets")
        .where({ id: req.params.id })
        .first();

      res.status(200).json(ticket);
    } else {
      res.status(404).json({ message: "Records not found" });
    }
  } catch (error) {}
});

module.exports = router;