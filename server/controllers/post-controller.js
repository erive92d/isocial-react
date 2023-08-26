// import user model
const { User, Post } = require("../models")
// import sign token function from auth
const { signToken } = require("../utils/auth");


module.exports = {
    async queryPosts(req, res) {
        try {
            const allPosts = await Post.find().populate("postAuthor").sort({ createdAt: -1 })
            if (!allPosts) {
                res.status(400).json({ message: "Failed to fetch items" })

            }
            res.status(200).json(
                {
                    data: allPosts,
                    postCount: allPosts.length
                }
            )

        } catch (error) {
            res.status(400).json(error.message)
        }

    },

    async queryOnePost({ params }, res) {
        // console.log(params)
        try {
            const onePost = await Post.find(
                {
                    _id: params.postId
                }
            ).populate({
                path: "postAuthor"
            }).populate({
                path: "comments.commentAuthor"
            })

            if (!onePost) {
                return res.status(400).json({ message: "Post not found" })
            }

            res.status(200).json(onePost)

        } catch (error) {
            res.status(400).json(error.message)
        }


    },
    async createPost({ user, body }, res) {


        try {

            const newPost = await Post.create(
                {
                    postText: body.postText,
                    postAuthor: user._id
                }
            )

            const userPost = await User.findOneAndUpdate(
                {
                    _id: user._id
                },
                {
                    $addToSet: { post: newPost }
                },
                {
                    new: true
                }
            )
            res.status(200).json(userPost)


        } catch (error) {
            res.status(400).json(error.message)
        }



    },



    async deletePost({ user, params }, res) {
        try {

            const userPosts = await User.findById(user._id)


            const deletePost = await Post.findByIdAndDelete(
                {
                    _id: params.postId
                }
            )

            res.status(200).json(deletePost)
        }

        catch (error) {
            res.status(450).json({ message: "Not authorized" })

        }


    },
    async querySingleUserPosts({ params }, res) {
        try {

            const postFound = await Post.find({
                postAuthor: params.userId
            })

            res.status(200).json(postFound)
        }
        catch (err) {
            res.status(400).json(err)
        }

    },
}