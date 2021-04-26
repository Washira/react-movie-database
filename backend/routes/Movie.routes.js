let express = require("express"),
  multer = require("multer"),
  mongoose = require("mongoose"),
  router = express.Router();

const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, file.fieldname + "-" + Date.now() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

// Movie Model
let Movie = require("../models/Movie");

//Create Movie
router.post("/add-movie", upload.single("movieImage"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const movie = new Movie({
    title: req.body.title,
    movieImage: url + "/public/" + req.file.filename,
    category: req.body.category,
    date: req.body.date,
    actors: req.body.actors,
    rating: req.body.rating,
  });
  movie
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Movie registered successfully!",
        userCreated: {
          title: result.title,
          movieImage: result.movieImage,
          category: result.category,
          date: result.date,
          actors: result.actors,
          rating: result.rating,
        },
      });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
});

//Get List Of Movie
router.get("/", (req, res, next) => {
  Movie.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        message: "Movie list retrieved successfully!",
        movie: data,
      });
    }
  });
});

//Get Single Movie
router.get("/find-movie/:id", (req, res) => {
  Movie.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        message: "A movie retrieved successfully!",
        movie: data,
      });
    }
  });
});

//Delete Movie
router.delete("/delete-movie/:id", (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({ message: data });
    }
  });
});

//Update Stormtrooper
router.put("/update-movie/:id", (req, res, next) => {
    Movie.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.json(data);
        console.log("Movie successfully updated");
      }
    }
  );
});

module.exports = router;
