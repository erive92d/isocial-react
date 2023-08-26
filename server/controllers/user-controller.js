// import user model
const { User, Post } = require("../models")
// import sign token function from auth
const { signToken } = require("../utils/auth");


module.exports = {
  //get all users
  async allUsers(req, res) {
    try {
      const getUsers = await User.find({});
      res.status(200).json(getUsers);

    } catch (err) {
      res.status(400).json({ message: "Failed" })
    }

  },
  async getSingleUser({ user, params }, res) {

    try {
      const foundUser = await User.findOne({
        $or: [
          { _id: user ? user._id : params.userId },
          { username: params.username },
        ],
      }).populate("post");

      res.status(200).json(foundUser);
    } catch (err) {
      res.status(400).json({ message: "Failed" })
    }

  },


  async queryUserWithName({ params }, res) {
    console.log
    try {
      const userFound = await User.find({
        name: params.userN
        // { username: params.name },
      }
      )
      res.status(200).json(userFound)

    } catch (error) {
      res.status(500).json({ message: "User not found" })
    }

  },

  async login({ body }, res) {
    // console.log(body)

    try {
      const user = await User.findOne({
        username: body.username
      })

      // console.log(user, "@@@@@@")
      if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
      }

      const correctPw = await user.isCorrectPassword(body.password);
      if (!correctPw) {
        return res.status(420).json({ message: "Wrong password!" });
      }

      // res.json(user)

      const token = signToken(user);

      if (!token) {
        return
      }

      res.status(200).json({ token, user });

    }
    catch (err) {
      res.status(400).json({ message: "login failed" })
    }

  },
  async createUser({ body }, res) {


    try {
      const newUser = {
        ...body,
        name: body.name.toLowerCase()
      }

      const user = await User.create(newUser);

      const token = signToken(user);
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(560).json(error);
    }
  },



  async addComment({ user, body, params }, res) {

    try {
      const newComment = {
        commentText: body.commentText,
        commentAuthor: user._id
      }

      const updatedPost = await Post.findOneAndUpdate(
        {
          _id: params.postId
        },
        {
          $addToSet: { comments: newComment }
        },
        {
          new: true
        }
      )

      res.status(200).json(updatedPost)

    } catch (error) {
      res.status(400).json(error.message)
    }
  },

  async followUser({ user, params }, res) {



    try {

      const updateUser = await User.findByIdAndUpdate(
        {
          _id: user._id
        },
        {
          $addToSet: {
            following: params.userId
          }
        }
      )
      const followedUser = await User.findByIdAndUpdate(
        {
          _id: params.userId
        },
        {
          $addToSet: {
            followers: user._id
          }
        }
      )

      res.status(200).json(followedUser)
    } catch (error) {
      res.status(400).json(error)
    }

    // console.log(updateUser)
    // const followedUser = await User.findByIdAndUpdate(
    //   {
    //     _id: params._id
    //   },
    //   {
    //     $addToSet: { followers: user._id }
    //   }
    // )

    // try {
    //   
    //   return res.json(updateUser, followedUser)


    // } catch (e) {
    //   console.error(e)
    // }




  }



};
