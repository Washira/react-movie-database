const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    title: { type: String },
    movieImage: { type: String },
    category: { type: String },
    date: { type: Date },
    actors: { type: String },
    rating: { type: Number },

  },
  {
    collection: "movielist",
  }
);

module.exports = mongoose.model("Movie", movieSchema);
