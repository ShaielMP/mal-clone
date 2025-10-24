/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('reviews', table => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.integer('anime_id').notNullable();
    table.string('anime_title', 255).notNullable();
    table.decimal('score', 3, 1).notNullable().checkBetween([0, 10]);
    table.text('content').notNullable();
    table.integer('helpful_count').defaultTo(0);
    table.integer('total_votes').defaultTo(0);
    table.boolean('contains_spoiler').defaultTo(false);
    table.timestamps(true, true);

    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.index('user_id');
    table.index('anime_id');
    table.index('created_at');
    table.unique(['user_id', 'anime_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('reviews');
};
