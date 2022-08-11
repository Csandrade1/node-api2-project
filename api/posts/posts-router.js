// implement your posts router here
const express = require("express");
const Posts = require("./posts-model");

const router = express.Router();

router.get("/", (req, res) => {
  Posts.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" });
    });
});

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((posts) => {
      if (!posts) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        res.json(posts);
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "The post information could not be retrieved" });
    });
});

router.post("/", (req, res) => {
  Posts.insert(req.body)
    .then((posts) => {
      if (!req.body.title == null || !req.body.contents == null) {
        res
          .status(400)
          .json({ message: "Please provide title and contents for the post" });
      } else {
        res.status(201).json(posts);
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "There was an error while saving the post to the database",
      });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  Posts.update(req.params.id, changes)
    .then((post) => {
      if (!req.body.title == null || !req.body.contents == null) {
        res
          .status(400)
          .json({ message: "Please provide title and contents for the post" });
      } else if (post.id == null) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The user information could not be modified" });
    });
});

router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then((result) => {
      console.log(result);
      if (result.id === undefined) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        res.json(result);
      }
    })
    .catch(() => {
      res.status(500).json({ message: "The post could not be removed" });
    });
});

router.get("/:id/comments", (req, res) => {
  Posts.findCommentById(req.params.id)
    .then((posts) => {
      if (!posts) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        res.json(posts);
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The comments information could not be retrieved" });
    });
});
module.exports = router;
