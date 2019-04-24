exports.up = knex =>
  knex.schema
    .createTable("users", table => {
      table.increments();
      table
        .string("email", 255)
        .notNullable()
        .unique();
      table
        .string("username", 255)
        .notNullable()
        .unique();
      table.string("password", 255).notNullable();
      table.string("role", 50).defaultTo("student");
      table.timestamps(true, true);
    })
    .createTable("tickets", table => {
      table.increments();
      table.string("status", 128).notNullable();
      table.string("title", 256).notNullable();
      table.text("description").notNullable();
      table.text("tried");
      table
        .integer("student_id")
        .unsigned()
        .notNullable();
      table.foreign("student_id").references("users.id");
      table.integer("helper_id").unsigned();
      table.foreign("helper_id").references("users.id");
      table.string("categories").references("categories.name");
      table.timestamps(true, true);
    })
    .createTable("categories", table => {
      table.increments();
      table
        .string("name", 128)
        .notNullable()
        .unique();
    })
    .createTable("roles", table => {
      table.increments();
      table
        .string("name", 128)
        .notNullable()
        .unique();
    })
    .createTable("categorized_tickets", table => {
      table.increments();
      table
        .integer("ticket_id")
        .unsigned()
        .notNullable();
      table
        .foreign("ticket_id")
        .references("tickets.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("category_id")
        .unsigned()
        .notNullable();
      table
        .foreign("category_id")
        .references("categories.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("tickets")
    .dropTableIfExists("categories")
    .dropTableIfExists("roles")
    .dropTableIfExists("categorized_tickets");
};
