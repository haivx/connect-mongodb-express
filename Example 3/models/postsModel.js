const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postsModel = new Schema({
  title: {
    type: String
  },
  content: {
    type: String,
    required: true //Will not create PostsModel without content property
  },
  categories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
    required: true
  }
})

module.exports = mongoose.model('posts', postsModel)