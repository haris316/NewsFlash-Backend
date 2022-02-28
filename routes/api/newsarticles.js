const express = require("express");
const router = express.Router();


// Load NewsArticle Model
const NewsArticleModel = require("../../models/NewsArticle");
const UserModel = require("../../models/User");
const CompanyModel = require("../../models/Company");

router.post("/getall", (req, res) => {
  NewsArticleModel.find({ is_deleted: false }).then((docs, err) => {
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
  });
});

// router.get("/getalltemp", (req, res) => {
//   CompanyModel.find({ is_deleted: false }).then((docs, err) => {
//     if (docs) {
//       return res
//         .status(200)
//         .json({
//           error: false,
//           data: docs,
//           message: "Here you go good sir",
//         });
//     } else if (err) {
//       return res.status(200).json({ error: true, message: "Unable to fetch data", err: err });
//     }
//   });
// });



router.post("/addarticle", (req, res) => {
  const calc_characters = req.body.body.length;
  const calc_sentences = req.body.body.replace(/[.?!]/g,"|").split("|").length;
  const calc_words = req.body.body.split(" ").length;
  const calc_body = req.body.body.split("\n");
  const author_email = req.body.author_email;
  const company_email = req.body.company_email;
  let id_author = "";
  let id_company = "";
  UserModel.findOne({ email: author_email }).then((docs, err) => {
    if (docs) {
      id_author = docs._id;
      // console.log(docs)
      CompanyModel.findOne({ email: company_email }).then((docs, err) => {
        if (docs) {
          id_company = docs._id;
          const newArticle = new NewsArticleModel({
            author: id_author,
            company: id_company,
            body_full: req.body.body,
            body: calc_body,
            title: req.body.title,
            summary: req.body.summary,
            counts: {
              characters: calc_characters,
              sentences: calc_sentences,
              paragraphs: calc_body.length,
              words: calc_words
            },
          });
          // console.log(newArticle);
          newArticle.save().then((Article) => {
            // console.log(Article);
            res.status(200).json({
              success: true,
              error: false,
              Article: Article,
              message: "Article successfully added!",
            })
          }).catch((err) => {
            return res
              .status(200)
              .json({ success: false, message: "Please try agin later", err: err });
          });
        } else if (err) {
          return res.status(200).json({ error: true, message: "Unable to find company", err: err });
        }
      })
    } else if (err) {
      return res.status(200).json({ error: true, message: "Unable to found user", err: err });
    }
  })
});

router.get("/log", (req, res) => {
  return res.status(400).json({ message: "Working" });
})


// // Update name of user
// router.post("/updatename", (req, res) => {
//   const { email, newName } = req.body;

//   userModel.findOneAndUpdate(
//     { email: email, is_deleted: false },
//     { name: newName },
//     (err, doc) => {
//       if (err) {
//         return res.status(400).json({
//           error: true,
//           message: err.message,
//           data: err,
//         });
//       } else {
//         return res.status(200).json({
//           error: false,
//           message: "Name updated successfully!",
//         });
//       }
//     }
//   );
// });

module.exports = router;
