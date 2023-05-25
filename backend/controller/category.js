const Category = require("../src/models/category")

exports.getCategories = async (req, res, next) => {

    try {
        const categories = await Category.find().sort({ 'gigs.length': -1 }).exec();
        res.json({ data: categories.map((cat)=>({id:cat._id,label:cat.label})), status: "success" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}