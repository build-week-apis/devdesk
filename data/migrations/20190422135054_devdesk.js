exports.up = knex => knex.schema
  .createTable('users', table => {
    table.increments();
    table.string('email', 255).notNullable().unique();
    table.string('username', 255).notNullable().unique();
    table.string('password', 255).notNullable();
    table.string('role', 50).defaultTo('student');
    table.timestamps(true, true);
  })
  .createTable('tickets', table => {
    table.increments();
    table.string('status', 128).notNullable();
    table.string('title', 256).notNullable();
    table.text('description').notNullable();
    table.text('tried');
    table.integer('student_id').unsigned().notNullable();
    table.foreign('student_id').references('users.id');
    table.integer('helper_id').unsigned();
    table.foreign('helper_id').references('users.id');
    table.timestamps(true, true);
  })
  

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users').dropTableIfExists('tickets');
};
