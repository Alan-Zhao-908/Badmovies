const axios = require('axios')
const apiHelper = require('../../helpers/api');
const mongo = require('../../database/mongo/mongo')
const mysql = require('../../database/mysql/mysql')

module.exports = {
  getGenres: (req, res) => {
    apiHelper.genreQuery()
    .then(({data}) => {
        console.log(data.genres)
        res.send(data.genres)
      }
    )
    .catch(err => console.log(err)) 
  },
  getItems: (req,res) => {
    console.log(req.query.genre)
    return apiHelper.worstRatedQuery(req.query.genre) 
    .then(({data}) => {
      // console.log(data.results)
      res.send(data.results)
    })
  },
  postFavorite: (req, res) => {
    console.log(req.body)
    // mongo.store(req.body)
    mysql.store(req.body)
    res.send(req.body)
  },
  getFavorites: (req,res) => {
    mysql.retrieve()
    .then((result) => {
      res.send(result)
      console.log('database results: ' +result[0])
    })
  },
  removeFavorites: (req,res)=> {
    console.log(req.body)
    mysql.remove(req.body)
    res.send(req.body)
  }
}
