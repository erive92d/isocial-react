require("dotenv").config();
const connection = require("../config/connection").default;
const User = require("../models/User")
const Post = require("../models/Post")
connection.on("error", (err) => err);

connection.once("open", async () => {
    console.log("connected");

    try {
        console.log(User)
        // Drop existing users
        await User.deleteMany({});
        await Post.deleteMany({})

    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.info("Seeding complete! 🌱");
    process.exit(0);
});
