const User = require('../models/users.model')
const Car = require('../models/car.model')
module.exports = {
  index: async (req, res, next) => {
    // Async/Await
    try {
      const users = await User.find({})
      res.status(200).json(users)
    }
    catch (err) {
      next(err)
    }
  },
  newUser: async (req, res, next) => {
    try {
      const newUser = new User(req.body)
      const user = await newUser.save()
      res.status(200).json(user)
    } catch (err) {
      next(err)
    }
  },
  getUser: async(req,res,next) => {
    try{
      const {userId} = req.params
      const user = await User.findById(userId)
      res.status(200).json(user)
    }
    catch (err) {
      next(err)
    }
  },
  replaceUser: async(req,res,next) =>{
    try{
      const {userId} = req.params
      const newUser = req.body
      const result = await User.findByIdAndUpdate(userId,newUser)
      res.status(200).json({success: true})
    }
    catch(err) {
      next(err)
    }
  },
  modifyUser: async(req,res,next) =>{
    try{
      const {userId} = req.params
      const newUser = req.body
      const result = await User.findByIdAndUpdate(userId,newUser)
      res.status(200).json({success: true})
    }
    catch(err) {
      next(err)
    }
  },
  getUserCars: async(req,res, next) => {
    const {userId} = req.params
    const user = await User.findById(userId)

  },
  newUserCar: async (req,res,next) => {
    const { userId } = req.params 
    // Create a new car
    const newCar = new Car(req.body)
    // Get user that we want that car append to
    const user = await User.findById(userId)
    // Assign user as a car's seller
    newCar.seller = user
    // Save the car
    await newCar.save()
    // add car to the users's selling array
    user.cars.push(newCar)
    // Save the user
    await user.save();
    res.status(200).json(newCar)
  }
}

/*
We can interact with mongoose in 3 different ways:
1) Callbacks
2) Promise
3) Async/Await
*/