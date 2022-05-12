const express = require("express");
const router = express.Router();

// Load NewsArticle Model
// const NewsArticleModel = require("../../models/NewsArticle");
// const UserModel = require("../../models/User");
const CategoryModel = require("../../models/Category");


router.get("/getall", (req, res) => {
    CategoryModel.find({ is_deleted: false }, (err, docs) => {
        if (docs) {
            return res
                .status(200)
                .json({
                    error: false,
                    data: docs,
                    message: "Here you go good sir",
                });
        } else if (err) {
            return res.status(200).json({ error: true, message: "Unable to fetch data", err: err });
        }
    }).sort({ name: 1 });
});

router.post("/addcategory", (req, res) => {
    const name = req.body.name;
    CategoryModel.findOne({ name: name }).then((doc, error) => {
        if (doc) {
            return res.status(200).json({ error: true, message: "Category already exists" });
        }
        else {
            const newCat = new CategoryModel({
                name: name,
            });
            newCat.save().then((Category) => {
                res.status(200).json({
                    success: true,
                    error: false,
                    Category: Category,
                    message: "Category successfully added!",
                })
            }).catch((err) => {
                return res.status(200).json({ success: false, message: "Please try agin later" });
            });
        }
    })
});

module.exports = router;
