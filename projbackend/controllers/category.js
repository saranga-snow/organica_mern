const Category = require("../models/category")

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category not found!!!"
      })
    }
    req.category = category
    next()
  })
}

exports.createCategory = (req, res) => {
  console.log("CATEGORY CREATE REQ")
  console.log(req.body.name)
  const category = new Category(req.body)
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save the category!!!!"
      })
    }
    res.json(category)
  })
}

exports.getCategory = (req, res) => {
  return res.json(req.category)
}

exports.getAllCategory = (req, res) => {
  // console.log("ALL CATEGORIES REQ!!!")
  Category.find().exec((err, categories) => {
    if (err || !categories) {
      return res.status(400).json({
        error: "Unable to get categories"
      })
    }
    return res.json(categories)
  })
}

exports.updateCategory = (req, res) => {
  console.log("UPDATE CATEGORY REQ!!")
  const category = req.category
  category.name = req.body.name
  console.log(req.body)

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: `Failed to update category`
      })
    }
    return res.json(updatedCategory)
  })
}

exports.removeCategory = (req, res) => {
  const category = req.category
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: `Failed to delete category ${category.name}`
      })
    }
    return res.json({
      message: `Successfully deleted category ${category.name}!!`
    })
  })
}
