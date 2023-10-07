const mongoose = require("mongoose");

const UserDetailsScehma1 = new mongoose.Schema(
  {
    fname: String,
  },
  {
    collection: "UserInfo",
  }
);
mongoose.model("UserInfo", UserDetailsScehma1);