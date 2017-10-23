const Categories = require('../models/categoriesModel')
const Post = require('../models/postsModel')
module.exports = {
  index: async(req,res) => {
    try {
      const allCategories = await Categories.findById('59ecc3ff147b260bce307d85').populate('post')
      res.json(allCategories)
    }
    catch (err) {
      console.log('ERROR', err)
    }
  },
  addCategories: async (req,res) =>{
    try {
      //Get data from client and save to model
      const newCategory = new Categories(req.body)
  
      //Save it into database
      const addCategory = await newCategory.save()
  
      //Response
      res.status(200).json(addCategory)
    }
    catch (err) {
      console.log('ERROR', err)
    }
  },
  addNewPost: async (req,res) => {
    try {
      //Get id of categories from Params
      const { id } = req.params

      //Create new post
      const newPost = new Post(req.body)
      // console.log('newPost', newPost)

      //Get categories
      const category = await Categories.findById(id)

      // Assign categories as a post's category: 
      newPost.categories = category

      //Save Post into database
      await newPost.save()
      
      //push categories to post's categorires: We push entitre object
      category.post.push(newPost)

      //save categories
      await category.save()
      //Response
      res.status(200).json(newPost)
    }
    catch (err) {
      console.log('ERROR', err)
    }
  }
}