const express = require("express");
const router = express.Router();
const db = require("./data/db.js");

router.get("/", (request, response) => {
  db.find()
    .then(res => {
      if (res) {
        response.status(200).json({ success: true, res });
      } else {
        status(404).json({ success: false, message: "No posts available." });
      }
    })
    .catch(err => {
      console.error(err);
      response.status(500).json({ success: false, err });
    });
});

router.get("/:id", (request, response) => {
  const { id } = request.params;
  db.findById(id)
    .then(res => {
      if (res) {
        response.status(200).json({ success: true, res });
      } else {
        response
          .status(404)
          .json({ success: false, message: "Post does not exist." });
      }
    })
    .catch(err => {
      response.status(500).json({ success: false, err });
    });
});

router.get("/:id/comments", (request, response) => {
  const { id } = request.params;
  db.findCommentById(id)
    .then(res => {
      response.status(200).json({ success: true, res });
    })
    .catch(err => {
      response.status(500).json({ success: false, err });
    });
});

router.post("/", (request, response) => {
  const post = request.body;
  db.insert(post)
    .then(assignedId => {
      response.status(201).json({ success: true, assignedId });
    })
    .catch(err => {
      response.status(500).json({ success: false, err });
    });
});

router.post("/:id/comments", (request, response) => {
  //returns id of inserted comment
  const post_id = request.params.id;
  const { newComment } = request.body;

  if (post_id) {
    db.insertComment({ newComment, post_id })
      .then(commentId => {
        response.status(201).json({ success: true, commentId });
      })
      .catch(err => {
        response.status(500).json({ success: false, err });
      });
  } else {
    response.status(404).json({
      success: false,
      message: "There are no valid posts with that ID."
    });
  }
});

router.put("/:id", (request, response) => {
  const { id } = request.params;
  const updateInfo = request.body;
  db.update(id, updateInfo)
    .then(res => {
      response.status(201).json({ success: true, res });
    })
    .catch(err => {
      response.status(500).json({ success: false, err });
    });
});

router.delete("/:id", (request, response) => {
  const { id } = request.params;
  db.remove(id)
    .then(res => {
      response.status(204);
    })
    .catch(err => {
      response.status(500).json({ success: false, err });
    });
});

module.exports = router;
