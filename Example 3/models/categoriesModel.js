const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoriesModel = new Schema({
  category: String,
  post: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts'
  }]
})

module.exports = mongoose.model('categories', categoriesModel)