const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const authorController = require('../controllers/authorController')
const categoriesController = require('../controllers/categoriesController')

router.route('/')
    .get(postController.index)

router.route('/author')
    .get(authorController.index)
    .post(authorController.addAuthor)

router.route('/categories/:id')
      .post(categoriesController.addNewPost)

router.route('/categories')
    .get(categoriesController.index)
    .post(categoriesController.addCategories)


module.exports = router
