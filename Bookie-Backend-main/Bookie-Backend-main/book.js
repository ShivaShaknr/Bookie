const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
  {
    book:String,
  },
  {
    collection: "UserInfo",
  }
);
mongoose.model("UserInfo", UserDetailsScehma);