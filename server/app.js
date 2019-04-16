const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const PORT = process.env.PORT || 3000
const path = require('path')

const Routes = require('./routes/routes')



app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())


app.use('/movies', Routes)

// app.use(express.static('/Users/alanzhao/Documents/coding/random_repos/Mock-TA-Badmovies-mongodb/client/dist'))
app.use(express.static(path.join(__dirname, '../client/dist')))

app.listen(PORT)
console.log(`Listening on port: ${PORT}`)


