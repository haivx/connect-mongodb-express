const Author = require('../models/authorModel')

module.exports = {
  index: async(req,res)=> {
    try {
      const allAuthor = await Author.find({})
      res.status(200).json(allAuthor)
    }
    catch (err) {
      console.log('ERROR', err)
    }
  },
  addAuthor: async(req,res) => {
    try {
      //Get value from client and add new model
      const addNewAuthor = new Author(req.body)

      // Save model into database
      const newAuthor = await addNewAuthor.save()

      //Response
      res.status(200).json(newAuthor)
    }
    catch (err) {
      console.log('ERROR: ', err)
    }
  }
}