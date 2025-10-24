/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('anime_lists', table => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.integer('anime_id').notNullable();
    table.string('anime_title', 255).notNullable();
    table.string('anime_image_url', 500);
    table
      .string('status', [
        'watching',
        'completed',
        'on-hold',
        'dropped',
        'plan-to-watch'
      ])
      .notNullable()
      .defaultTo('plan-to-watch');
    table.integer('episodes_watched').defaultTo(0);
    table.integer('total_episodes');
    table.decimal('score', 3, 1).checkBetween([0, 10]);
    table.date('start_date');
    table.date('finish_date');
    table.text('notes');
    table.integer('rewatch_count').defaultTo(0);
    table.boolean('is_favourite').defaultTo(false);
    table.timestamps(true, true);

    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.index('user_id');
    table.index('anime_id');
    table.index('status');
    table.index('is_favourite');
    table.unique(['user_id', 'anime_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('anime_lists');
};
