const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('categories').select('name');
}

function findBy(filter) {
  return db('categories').where(filter);
}

async function add(cat) {
  const [id] = await db('categories').insert(cat);

  return findById(id);
}

function findById(id) {
  return db('categories')
    .where({ id })
    .first();
}
