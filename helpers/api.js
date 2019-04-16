const axios = require('axios');
const {API_KEY} = require('../config')

function getMovieData(movie) {
  axios.get('https://api.themoviedb.org/3/discover/movie', {
    params: {
      api_key: '9b3c349bac38fb67ebbd1744c838814b'
    }
  }).then(({data}) => {
  })
}

const worstRatedQuery = (genre) => {
  let url = `http://api.themoviedb.org/3/discover/movie`
  map = {
    'Action': 28,
    'Adventure': 12,
    'Animation': 16,
    'Comedy': 35,
    'Crime': 80,
    'Documentary': 99,
    'Drama': 18,
    'Family': 10751,
    'Fantasy': 14,
    'History': 36,
    'Horror': 27,
    'Music': 10402,
    'Mystery': 9648,
    'Romance': 10749,
    'Science Fiction': 878,
    'TV Movie': 10770,
    'Thriller': 53,
    'War': 10752
  }

  return axios.get(url, {
    params: {
      api_key: API_KEY,
      sort_by: `vote_average.desc`,
      page:1,
      with_genres: map[genre] || '',
      "vote_count.gte":10
    }
  })
}



const genreQuery = () => {
  let url = `http://api.themoviedb.org/3/genre/movie/list`
  return axios.get(url, {
    params: {
      api_key:API_KEY
    }
  }) 
}

module.exports = {
  genreQuery: genreQuery,
  worstRatedQuery: worstRatedQuery
}