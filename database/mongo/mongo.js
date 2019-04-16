// 

const mongoose = require('mongoose');
if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI)
} else{
  mongoose.connect('mongodb://localhost:27017/badmovies', { useNewUrlParser: true });
}

const db = mongoose.connection;
mongoose.Promise = Promise;

let favSchema = new mongoose.Schema({
  poster_path: String,
  original_title: String,
  release_date: String,
  vote_average: Number
})

let Fav = mongoose.model('fav', favSchema, 'fav')

let store = function(item) {
  // // Option1
  // item = new Fav({
  //   name: item.name
  // })
  // item.save()

  // option2
  Fav.findOneAndUpdate({poster_path:item.poster_path},{
    poster_path: item.poster_path,
    original_title: item.original_title,
    release_date: item.release_date,
    vote_average: item.vote_average
  }, {upsert:true})
  .exec()
  .then(() => console.log('saved an item'))
}


let retrieve = () => {
  return Fav.find({})
  .exec()
  
}


// db.on('error', console.error.bind(console, 'Connection error:'));
// db.once('open', () => {
//   console.log('Connected to db...');
//   // db.collection('fav').insertOne({"name": "alan"})
//   // item.save().then(()=> console.log('done'))
// })

module.exports = {
  store: store,
  retrieve: retrieve
}