const router = require("express").Router();
const { allUsers, login, createUser, getSingleUser, createPost, queryPosts, queryOnePost, addComment, querySingleUserPosts, queryUserWithName, followUser, deletePost } = require("../../controllers/user-controller");

// import middleware
const { authMiddleware } = require("../../utils/auth");

// put authMiddleware anywhere we need to send a token for verification of user
router
  .route("/")
  .get(allUsers)
  .post(createUser)

router.route("/login").post(login)
router.route("/comment/:postId").post(authMiddleware, addComment)
router.route("/me").get(authMiddleware, getSingleUser)
router.route("/user/:userId").get(getSingleUser)
router.route("/username/:userN").get(queryUserWithName)
router.route("/follow/:userId").post(authMiddleware, followUser)







// router.route("/me").get(authMiddleware, getSingleUser);



module.exports = router;
