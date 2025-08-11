const CategoryService = require("../services/admin/category.service");
const ValidateCategory = require("../validations/category.validation");
const path = require("path");

const postCategory = async (req, res) => {
  // const categoryData = { ... req.body, image:req.file.filename}
  const categoryData = { ...req.body };
  const category = await CategoryService.createCategory(categoryData);
  res.send(category);
};

const getAllCategories = async (req, res) => {
  const categories = await CategoryService.getAllCategory();

  res.json(categories);
};
const getCategoryImage = (req, res) => {
  CategoryService.getCategoryImage(req.params.categoryId).then((image) => {
    const imagePath = path.resolve("src", "images", image); 
    res.sendFile(imagePath);
  });
};

const updateCategory = (req, res) => {
  const { error, value } = ValidateCategory.validateUpdatedCategory(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    CategoryService.updateCategory(req.params.categoryId, req.body).then(
      (category) => {
        res
          .status(200)
          .json({ message: "Category updated successfully", category });
      }
    );
  }
};
module.exports = {
  postCategory,
  getAllCategories,
  getCategoryImage,
  updateCategory,
};
