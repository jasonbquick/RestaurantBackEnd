const knex = require("../db/connection");

function list(){
    return knex("reservations").select("*")
}

function create(reservation){
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((reservations) => reservations[0])
}

module.exports = {
    list,
    create,
}