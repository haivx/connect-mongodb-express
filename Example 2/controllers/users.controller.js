const User = require('../models/users.model')
const Car = require('../models/car.model')
module.exports = {
  index: async (req, res, next) => {
    // Async/Await
    try {
      const users = await User.find({})
      res.status(200).json(users)
      // const cars = await Car.find({_id: "59e96c1801ab7b2b50824fd0"}).populate('user')
      // res.status(200).json(cars.title)
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
    console.log('userId', userId)
    const user = await User.findById(userId)
    console.log('user', user)
  },
  newUserCar: async (req,res,next) => {
    const {userId} = req.params
    const newCar = req.body
    newCar.user = userId
    console.log('newCar', newCar);

    let carsave = await new Car(newCar)
    await carsave.save();

    // Create a new car
    // let result = await Car.find()
    // console.log('result', result)
    res.status(200).json(newCar)
  }
}
