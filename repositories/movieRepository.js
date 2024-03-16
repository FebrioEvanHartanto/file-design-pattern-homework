const {Movie} = require("../models")

class MovieRepository {

  static findAllMovies = async (params) => {
    try {
      const movies = await Movie.findAll(params);
      
      return movies;
    } catch (err) {
        throw err;
    }
  }

  static findMovieById = async (params) => {
    try {
      const movie = await Movie.findOne(params);
      return movie;
  } catch(err) {
      throw err;
  }
  }

  static createMovie = async (params) => {
    try {
        const movie = await Movie.create(params, {
          returning: true
        })

        return movie;
    } catch (err) {
        throw err;
    } 
  }

  static updateMovie = async (id, body) => {
    try {
      const movie = await Movie.findOne({
        where: {
          id
        }
      })

      if(!movie){
        throw ({name: "MovieNotFound!", message:"Movie Not Found!"})
      } else {
        await movie.update(body);
      }

    } catch (err) {
        throw err;
    }
  }

  static deleteMovie = async (id) => {
    try {
      const movie = await Movie.findOne({
        where: {
          id
        }
      })

      if(!movie){
        throw ({name: "MovieNotFound!", message:"Movie Not Found!"})
      } else{
        await movie.destroy();
      }

    } catch (err) {
        throw err;
    }
  }


}

module.exports = MovieRepository;