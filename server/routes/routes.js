const express = require('express')
const router = express.Router()
const controller = require('../controller/controller.js')


router.get('/genres', controller.getGenres)

router.get('/items', controller.getItems)

router.post('/favorites', controller.postFavorite)

router.get('/favorites', controller.getFavorites)

router.delete('/favorites', controller.removeFavorites)

module.exports = router