const axios = require('axios')

const getGenres = (callback) => {
  let url = `http://localhost:3000/movies/genres`
  axios.get(url).then(result => {
    let state = [];
    result.data.map(item => {
      state.push(item.name)
    })
    callback(state)
  })
}

const getItems = (genre) => {
  let url = `http://localhost:3000/movies/items`
  return axios.get(url, {
    params: {
      genre: genre
    }
  }
  )
}

export {getGenres, getItems};