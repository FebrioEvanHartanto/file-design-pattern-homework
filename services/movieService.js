const MovieRepository = require("../repositories/movieRepository.js")
const { Op } = require("sequelize")
const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

class MovieService {

  static findAllMovies = async (params) => {
    try {

      let {title, genres, year, limit, page} = params;

      let filterOptions = {
        where: {},
      } 
      
      let titleFilter = {}
      let genresFilter = {}
      let yearFilter = {}

      if(title) {
        titleFilter = {
          title: {
            [Op.iLike]: `%${title}%`
          }
        }
      }

      if(genres) {
        genresFilter = {
          genres: {
            [Op.iLike]: `%${genres}%`
          }
        }
      }

      if(year) {
        yearFilter = {
          year: year 
        }
      }

      filterOptions.where = {
        ...titleFilter,
        ...genresFilter,
        ...yearFilter
      } 

      limit = +limit || DEFAULT_LIMIT;
      page = +page || DEFAULT_PAGE;
      const offset = (page - 1) * limit;

      filterOptions.limit = limit;
      filterOptions.offset = offset;

      const movies = await MovieRepository.findAllMovies(filterOptions);

      return movies;

    } catch (err) {
        throw err;
    }
  }

  static findMovieById = async (id) => {
    try {
      const filterOptions = {
          where: {
              id
          }
      }
      const movie = await MovieRepository.findMovieById(filterOptions);
      if(!movie){
          throw {name: "ErrorNotFound", message: "Movie Not Found"}
      } else {
      return movie;
      }

  } catch(err) {
      throw err
  }
  }

  static createMovie = async (params) => {
    try {
      
      const movie = await MovieRepository.createMovie(params)
      return movie;

    } catch (err){
        throw err
    }
  }

  static uploads = async (file) => {
    try {
        if(file) {
          
            const url = `${process.env.BASE_URL}/api/images/${file.filename}`

            return url;
        } else {
            throw {name: "MissingFile"}
        }
    } catch(err) {
        throw err;
    }
}

  static updateMovie = async (params) => {
    try {
        const {id, body} = params;
        await MovieRepository.updateMovie(id, body);
    } catch (err) {
        throw err;
    }
  }

  static deleteMovie = async (id) => {
    try {
      
      await MovieRepository.deleteMovie(id)
    } catch (err) {
        throw err;
    }
  }

  

}

module.exports = MovieService;