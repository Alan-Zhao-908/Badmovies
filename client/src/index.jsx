import React from 'react'
import ReactDOM from 'react-dom'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
import {getGenres, getItems} from './lib/api'
import Promise from 'bluebird'
import axios from 'axios'
import {filter} from 'underscore'


class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      movies: [{deway: 'movies'}],
      favorites: [{deway: "favorites"}],
      genres: [],
      genre: 28,
      showFaves: false,
    }
    this.changeGenre = this.changeGenre.bind(this)
  }

  componentDidMount() {
    getGenres(results => {
      this.setState({
        genres: results 
      })
    })
    this.getMovies()

  }

  

  getMovies() {
    getItems(this.state.genre)
    .then(({data})=>{
      this.setState({
        movies: data
      })
    })
  }

  saveMovies() {

  }

  deleteMovie() {

  }

  swapFavorites() {
    axios.get('/movies/favorites')
    .then(result => {
      console.log(result[0])
      this.setState({
        favorites: result.data
      })
    })
    .then(() => {
      this.setState({
        showFaves: !this.state.showFaves
      })
    })
  }

  changeGenre(event) {
    this.setState({
      genre: event.target.value
    })
  }

  handleClick() {
    this.getMovies()
  }

  // unRenderFavorite(path) {
  //   console.log(this.state)
  //   let state = this.state.favorites.slice()
  //   filter = state.filter(item => {
  //     item.poster_path !== path
  //   })
  //   console.log(filter)
  //   this.setState({
  //     favorites: filter 
  //   })
  // }

  saveItem(event) {
    event.preventDefault()
    var item = event.currentTarget.querySelectorAll("*")
    var payload = {
      poster_path: item[0].src,
      original_title: item[2].textContent,
      release_date: item[6].textContent,
      vote_average: item[9].textContent
    }
    if (this.props.showFaves) {
      // let state = this.props.movies.slice()
      // console.log(state)
      // let filter = state.filter(stateItem => {
      //   return stateItem.poster_path !== item[0].src
      // })
      // this.setState({
      //   favorites: filter
      // })
      axios.delete('/movies/favorites', {
        data: payload
      })
      .catch(err => console.log(err))
      // .then(() => {

      //   console.log(filter)
      //   this.setState({
      //     favorites: filter 
      //   })
      // })
    } else {
      axios.post('/movies/favorites', payload)
      .then(({data}) => console.log(data))
      .catch(err => console.log(err))
    }

  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        <div className="main">
          <Search handleClick={this.handleClick.bind(this)} genre={this.state.genre} changeGenre={this.changeGenre.bind(this)} genres={this.state.genres} swapFavorites={this.swapFavorites.bind(this)} showFaves={this.state.showFaves}/>
          <Movies saveItem={this.saveItem} movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));