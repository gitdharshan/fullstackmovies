const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const Movie = require("../models/movies");
const HttpError = require("../models/http-error");
const User = require("../models/users");



const getMoviesById = async (req, res, next) => {
  const movieId = req.params.mid;

  let movie;
  try {
    movie = await Movie.findById(movieId);
  } catch (err) {
    return next(new HttpError("Could not find a movie for the provided ID", 500));
  }

  if (!movie) {
    return next(new HttpError("Could not find a movie for the provided ID", 404));
  }

  res.json({ movie: movie.toObject({ getters: true }) });
};

const getMoviesByUserID = async (req, res, next) => {
  const userId = req.params.uid;

  let movies;
  try {
    movies = await Movie.find({ creator: userId });
  } catch (err) {
    return next(new HttpError("Fetching movies failed, please try again later", 500));
  }

  if (!movies || movies.length === 0) {
    return next(new HttpError("Could not find movies for the provided user ID", 404));
  }

  res.json({ movies: movies.map((movie) => movie.toObject({ getters: true })) });
};


const createMovie = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed", 422));
  }

  const { movie_name, year, description, rating, creator } = req.body;

  const createdMovie = new Movie({
    movie_name,
    year,
    description,
    rating,
    image:
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    return next(new HttpError("Creating movies failed, please try again later", 500));
  }

  if (!user) {
    return next(new HttpError("Could not find a user for the provided ID", 404));
  }

  try {
 
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdMovie.save({ session: sess });

    user.movies.push(createdMovie);
    await user.save({ session: sess });

    await sess.commitTransaction();
    sess.endSession();
  } catch (err) {
    return next(new HttpError("Creating movie failed, please try again later", 500));
  }

  res.status(201).json({ movie: createdMovie });
};


const updatedMovie = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please check your data", 422));
  }

  const { movie_name, description } = req.body;
  const movieId = req.params.mid;

  let movie;
  try {
    movie = await Movie.findById(movieId);
  } catch (err) {
    return next(new HttpError("Updating movie failed", 500));
  }

  if (!movie) {
    return next(new HttpError("Could not find movie for the provided ID", 404));
  }

  movie.movie_name = movie_name;
  movie.description = description;

  try {
    await movie.save();
  } catch (err) {
    return next(new HttpError("Something went wrong, could not update the movie", 500));
  }

  res.status(200).json({ movie: movie.toObject({ getters: true }) });
};


const deleteMovie = async(req,res,next) =>{
  const movieId=  req.params.mid;

  let movie;
  try{
  movie  =await Movie.findById(movieId).populate("creator");

  }
  catch(err){
   const error = new HttpError("Fetching movies failed, please try again later",500);
   return next(error);
  }
  if(!movie){
    return next(new HttpError("Could not find a movie for provided id",404));

  }
  try{
  const sess  = await mongoose.startSession();
  sess.startTransaction();
 await movie.deleteOne({session:sess});
 movie.creator.movies.pull(movie);
 await movie.creator.save({session:sess});
   await sess.commitTransaction();
  }
  catch(err){
  return next(new HttpError("Something went wrong could not delete a movie",400));
  }
  res.status(200).json({message:"Deleted successfully"})
;}
exports.getMoviesById = getMoviesById;
exports.getMoviesByUserID = getMoviesByUserID;
exports.createMovie = createMovie;
exports.updatedMovie = updatedMovie;
exports.deleteMovie = deleteMovie;
