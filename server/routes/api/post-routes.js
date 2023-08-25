const router = require("express").Router();
const { createPost, queryPosts, queryOnePost, querySingleUserPosts, deletePost } = require("../../controllers/post-controller");

// import middleware
const { authMiddleware } = require("../../utils/auth");

router.route("/").get(queryPosts).post(authMiddleware, createPost)
router.route("/:postId").get(queryOnePost).delete(authMiddleware, deletePost)
router.route("/userpost/:userId").get(querySingleUserPosts)


module.exports = router