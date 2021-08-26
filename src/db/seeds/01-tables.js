const tables = require("")
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {table_id: 1, table_name: 'Bar#1'},
        {table_id: 2, table_name: 'Bar#2'},
        {table_id: 3, table_name: 'Table#1'},
        {table_id: 4, table_name: 'Table#1'}
      ]);
    });
};
