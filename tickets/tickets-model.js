const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('tickets').select();
}

function findBy(filter) {
  return db('tickets').where(filter);
}

async function add(user) {
  const [id] = await db('tickets').insert(user);

  return findById(id);
}

function findById(id) {
  return db('tickets')
    .where({ id })
    .first();
}
