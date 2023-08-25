// import user model
const { User, Post } = require("../models")
// import sign token function from auth
const { signToken } = require("../utils/auth");


module.exports = {
  //get all users
  async allUsers(req, res) {
    try {
      const getUsers = await User.find({});

      if (!getUsers) {
        res.status(400).json({ message: "Failed" })
      }
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

      if (!foundUser) {
        return res
          .status(400)
          .json({ message: "Cannot find a user with this id!" });
      }
      // console.log(foundUser);
      return res.status(200).json(foundUser);
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


      if (!userFound) {
        return "No user found"
      }
      return res.status(200).json(userFound)

    } catch (error) {
      console.log(error)
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

      res.json({ token, user });

    }
    catch (err) {
      return res.status(400).json({ message: "login failed" })
    }

  },
  async createUser({ body }, res) {

    const newUser = {
      ...body,
      name: body.name.toLowerCase()
    }

    try {
      const user = await User.create(newUser);

      if (!user) {
        return res.status(400).json({ message: "Something is wrong!" });
      }


      const token = signToken(user);
      res.json({ token, user });
    } catch (error) {
      console.log(error)
      return res.status(560).json(error);
    }
  },



  async addComment({ user, body, params }, res) {
    // console.log(params, "params")
    // console.log(body)
    console.log(user)
    try {
      if (!user) {
        return res.status(400).json({ message: "Need to be logged in" })
      }

      const newComment = {
        commentText: body.commentText,
        commentAuthor: user._id
      }
      // if (!author) {
      //   return res.status(400).json({ message: "Invalid user" })
      // }

      if (!newComment) {
        return res.status(400).json({ message: "Could not send comment" })
      }
      console.log(newComment)

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

      console.log(updatedPost.comments)

      return res.json(updatedPost)

    } catch (error) {
      console.error(error)
    }

    // console.log(comment, "comment")
  },

  async followUser({ user, params }, res) {

    if (!user) {
      return res.status(400).json({ message: "Needs to be logged in" })
    }

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

    try {
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

      return res.json(followedUser)
    } catch (error) {
      console.error(error)
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
