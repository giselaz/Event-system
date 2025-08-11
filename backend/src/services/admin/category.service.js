const Category = require("../../model/category");

const createCategory = async (categoryData) => {
  if (await Category.findOne({ name: categoryData.name })) {
    throw new Error("Category with same name exists ");
  } else {
    const CategoryDb = new Category(categoryData);
    CategoryDb.save()
      .then(() => {
        console.log("Category created");
      })
      .catch((err) => {
        console.log(err);
      });
    return CategoryDb;
  }
};
const updateCategory = async (categoryId, categoryData) => {
  // find vendor to be updated
  const categoryDb = await Category.findById(categoryId);

  if (!categoryDb) {
    throw new Error(` vendor with id ${categoryId} not found`);
  }
  const updatedCategory = await Category.findOneAndUpdate(
    { _id: categoryId },
    { $set: categoryData },
    { new: true }
  );
  return updatedCategory;
};

const getCategoryImage = (categoryId) => {
  return new Promise((resolve, reject) => {
    Category.findById(categoryId)
      .select("image")
      .then((category) => resolve(category.image))
      .catch((err) => reject(err));
  });
};
const getAllCategory = () => {
  return Category.find({});
};

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryImage,
  updateCategory,
};
