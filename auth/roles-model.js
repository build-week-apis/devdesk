const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('roles').select();
}

function findBy(filter) {
  return db('roles').where(filter);
}

async function add(user) {
  const [id] = await db('roles').insert(user);

  return findById(id);
}

function findById(id) {
  return db('roles')
    .where({ id })
    .first();
}

