/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('username', 50).notNullable().unique();
    table.string('email', 100).notNullable().unique();
    table.string('password_hash', 255).notNullable();
    table.string('avatar_url', 500);
    table.text('bio');
    table.date('birthday');
    table.enum('gender', ['male', 'female', 'non-binary', 'prefer-not-to-say']);
    table.string('location', 100);
    table.timestamp('joined_at').defaultTo(knex.fn.now());
    table.timestamp('last_online').defaultTo(knex.fn.now());
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);

    table.index('username');
    table.index('email');
    table.index('is_active');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
