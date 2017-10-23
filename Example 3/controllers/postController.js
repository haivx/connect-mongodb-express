const Post = require('../models/postsModel')
module.exports = {
  index: async (req,res) => {
    try {
      const post = await Post.find({})
      res.json(post)
    }
    catch (err) {
      console.log('ERROR', err)
    }
  }
}