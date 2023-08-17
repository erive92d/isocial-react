import { connect, connection } from "mongoose";
require("dotenv").config();

connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/isocial-react",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  }
);

export default connection;
