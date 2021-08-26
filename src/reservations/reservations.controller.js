/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reservationExists(req, res, next){
  // const reservationId = 
}

function validPost(req, res, next){
  if(!req.body.first_name || !req.body.last_name){
    next({status: 400,
    message: `Reservation must include a first and last name`})
  }
  if(!req.body.phone_number){
    next({status: 400, 
    message: `Reservation must include a phone number`})
  }
  if(!req.body.reservation_date || !req.body.reservation_time){
    next({status: 400, 
    message: `Reservation must include a reservation date & time`})
  }
  if(!req.body.people){
    next({status: 400, 
    message: `Reservation must include a party size`})
  }
  const date = new Date(req.body.reservation_date)
  if(date.getDay() === 2){
    next({status: 400,
    message: `The restaurant is closed on Tuesdays, please select another date`})
  }
  const now = new Date()
  if(date < now){
    next({status: 400,
    message: `Please select a future date and time`})
  }
  if(req.body.reservation_time < "10:30:00" || req.body.reservation_time > "21:30:00"){
    next({status: 400, 
    message: `Please select a time between 10:30am and 9:30pm`})
  }
  return next();
}

async function list(req, res) {
  const result = await service.list();
  res.json({
    data: result,
  });
}

async function create(req, res, next){
  const data = await service.create(req.body)
  res.status(201).json({data})
}

module.exports = {
  list,
  // create: [validPost]
  create: [validPost, asyncErrorBoundary(create)],
};
