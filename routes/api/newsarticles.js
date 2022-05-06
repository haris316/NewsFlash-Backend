const express = require("express");
const router = express.Router();


// Load NewsArticle Model
const NewsArticleModel = require("../../models/NewsArticle");
const UserModel = require("../../models/User");
const CompanyModel = require("../../models/Company");
const hashtagModel = require("../../models/Hashtag");

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


router.post("/addarticle", (req, res) => {
  const calc_characters = req.body.body.length;
  const calc_sentences = req.body.body.replace(/[.?!]/g, "|").split("|").length;
  const calc_words = req.body.body.split(" ").length;
  const calc_body = req.body.body.split("\n");
  const author_email = req.body.author_email;
  const company_email = req.body.company_email;

  let polarity = [];
  for (var i = 0; i < req.body.categories.length; i++) {
    polarity.push({ type: req.body.categories[i], score: 1 })
  }

  let allKeywords = [];
  for (var i = 0; i < req.body.keywords.length; i++) {
    allKeywords.push(req.body.keywords[i].toLowerCase())
  }

  let id_author = "";
  let id_company = "";

  let allHashtags = [];
  for (var i = 0; i < req.body.hashtags.length; i++) {
    let NAME = req.body.hashtags[i].toUpperCase()
    hashtagModel.findOne({ name: NAME }).then((doc, err) => {
      let NewHashtag = {};
      if (err) {
        return res.status(200).json({ error: true, message: "Please Try Again. Problem with your hashtags", err: err });
      }
      else if (doc === null) {
        NewHashtag = new hashtagModel({
          name: NAME,
          createdDate: Date.now(),
          count: 1,
          isHyped: false,
        });
        allHashtags.push(NAME);
        NewHashtag.save();
      }
      else if (doc) {
        allHashtags.push(doc.name);
        doc.count = doc.count + 1;
        doc.save();
      }
    })
  }

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
            hashtags: allHashtags,
            keywords: allKeywords,
            links: req.body.links,
            sentiment: {
              polarity: polarity
            }
          });
          newArticle.save().then((Article) => {
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
      return res.status(200).json({ error: true, message: "Unable to find user", err: err });
    }
  })
});

router.get("/log", (req, res) => {
  return res.status(400).json({ message: "Working" });
})

router.post("/editarticle", (req, res) => {
  const calc_characters = req.body.body.length;
  const calc_sentences = req.body.body.replace(/[.?!]/g, "|").split("|").length;
  const calc_words = req.body.body.split(" ").length;
  const calc_body = req.body.body.split("\n");

  NewsArticleModel.findOneAndUpdate(
    { _id: req.body.id_article, author: req.body.id_author, company: req.body.id_company },
    {
      body_full: req.body.body,
      body: calc_body,
      title: req.body.title,
      summary: req.body.summary,
      counts: {
        characters: calc_characters,
        sentences: calc_sentences,
        paragraphs: calc_body.length,
        words: calc_words
      }
    },
    (err, doc) => {
      if (doc) {
        return res.status(200).json({
          error: false,
          data: doc,
          message: "Article Updated",
        });
      } else if (err) {
        return res.status(200).json({ error: true, message: "Unable to perform update at this moment", err: err });
      }
    })
});

router.post("/updatemedia", (req, res) => {
  let newmedia = req.body.newmedia;
  NewsArticleModel.findOneAndUpdate(
    { _id: req.body.id_article, author: req.body.id_author, company: req.body.id_company },
    {
      media: newmedia
    },
    (err, doc) => {
      if (doc) {
        return res.status(200).json({
          error: false,
          message: "Media Added",
        });
      } else if (err) {
        return res.status(200).json({ error: true, message: "Unable to upload at this moment", err: err });
      }
    })
});



module.exports = router;
