// import user model
const { User, Post } = require("../models")
// import sign token function from auth
const { signToken } = require("../utils/auth");


module.exports = {
    async queryPosts(req, res) {
        try {
            const allPosts = await Post.find().populate("postAuthor").sort({ createdAt: -1 })
            if (!allPosts) {
                return res.status(400).json({ message: "Failed to fetch items" })

            }
            return res.status(200).json(
                {
                    data: allPosts,
                    postCount: allPosts.length
                }
            )

        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
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

            return res.status(200).json(onePost)

        } catch (error) {
            console.log(error)
        }


    },
    async createPost({ user, body }, res) {

        const newPost = await Post.create(
            {
                postText: body.postText,
                postAuthor: user._id
            }
        )

        try {

            if (body.postText <= 280) {

                if (!newPost) {
                    return res.status(500).json({ message: "Post failed" })
                }

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
                if (!userPost) {
                    return res.status(501).json({ message: "Max characters allowed have been exceeded" })

                }

                return res.status(200).json(userPost)
            }

        } catch (error) {
            return res.status(501).json(error)
        }



    },



    async deletePost({ user, params }, res) {
        try {
            if (!user) {
                return res.status(400).json({ message: "User invalid" })
            }
            const deletePost = await Post.findByIdAndDelete(
                {
                    _id: params.postId
                }
            )

            if (!deletePost) {
                res.status(420).json({ message: "unable to delete" })
            }

            return res.status(200).json(deletePost)
        }

        catch (error) {
            console.log(error)
            return res.status(450).json({ message: "Not authorized" })

        }


    },
    async querySingleUserPosts({ params }, res) {
        try {
            if (!params.userId) {
                return res.status(400).json({ message: "Failed" })
            }
            const postFound = await Post.find({
                postAuthor: params.userId
            })


            if (!postFound) {
                return res.status(400).json({ message: "Posts not found" })
            }

            return res.status(200).json(postFound)
        }
        catch (err) {
            console.log(err)
            res.status(400).json(err)
        }

    },
}