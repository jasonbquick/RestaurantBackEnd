/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reservationExists(req, res, next){
  // const reservationId = 
}

function validPost(req, res, next){
  console.log(req.body.data)
  if(!req.body.data.first_name || !req.body.data.last_name){
    next({status: 400,
    message: `Reservation must include a first and last name`})
  }
  return next();
}

async function list(req, res) {
  const result = await service.list();
  console.log(result)
  res.json({
    data: result,
  });
}

async function create(req, res, next){
  const data = await service.create(req.body.data)
  res.status(201).json({data})
}

module.exports = {
  list,
  create: [validPost, asyncErrorBoundary(create)],
};
