/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('manga_lists', table => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.integer('manga_id').notNullable();
    table.string('manga_title', 255).notNullable();
    table.string('manga_image_url', 500);
    table
      .string('status', [
        'reading',
        'completed',
        'on-hold',
        'dropped',
        'plan-to-read'
      ])
      .notNullable()
      .defaultTo('plan-to-read');
    table.integer('chapters_read').defaultTo(0);
    table.integer('total_chapters');
    table.integer('volumes_read').defaultTo(0);
    table.integer('total_volumes');
    table.decimal('score', 3, 1).checkBetween([0, 10]);
    table.date('start_date');
    table.date('finish_date');
    table.text('notes');
    table.integer('reread_count').defaultTo(0);
    table.boolean('is_favourite').defaultTo(false);
    table.timestamps(true, true);

    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.index('user_id');
    table.index('manga_id');
    table.index('status');
    table.unique(['user_id', 'manga_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('manga_lists');
};
