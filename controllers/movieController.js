const MovieService = require("../services/movieService.js")

class MovieController {

  static findAllMovies = async (req, res, next) => {
    try {

     const movies = await MovieService.findAllMovies(req.query);
     
      res.status(200).json(movies);

    } catch (err) {
      next(err);
    }
  }

  static findMovieById = async (req, res, next) => {
    try {
      const movie = await MovieService.findMovieById(req.params.id);
      res.status(200).json({
          data: movie
      })
  } catch(err) {
      next(err)
  }
  }

  static createMovie = async (req, res, next) => {
    try {
      const movie = await MovieService.createMovie(req.body);
 
      res.status(201).json({
        message: "Movie created successfully! Movie Details: ",
        data: movie
      })

    } catch (err) {
      next(err);
    } 
  }

  static uploads = async (req, res, next) => {
    try {
        const url = await MovieService.uploads(req.file);

          res.status(201).json({
            message: "Upload successful!",
            photo: url 
        })
    } catch (err) {
      next(err);
    } 
  }

  static updateMovie = async (req, res, next) => {
    try {
        const params = {
          id: req.params.id,
          body: req.body
        }
        await MovieService.updateMovie(params);

        res.status(200).json({message : "Movie Successfully Updated!"})
    } catch (err) {
        next(err);
    }
  }

  static deleteMovie = async (req, res, next) => {
    try {
      await MovieService.deleteMovie(req.params.id);
      res.status(200).json({message: "Movie Deleted Successfully!"})
    } catch (err) { 
      next(err);
    } 
  }

}

module.exports = MovieController;