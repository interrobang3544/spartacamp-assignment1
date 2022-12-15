const mongoose = require("mongoose");

const connect = () => {
  mongoose.set('strictQuery', false)
  mongoose.connect("mongodb://127.0.0.1:27017/local_mongodb", { ignoreUndefined: true }).catch((err) => {
    console.error(err);
  })
};

module.exports = connect;