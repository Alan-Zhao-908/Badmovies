import React from 'react';
import axios from 'axios'

class Movies extends React.Component {
  constructor(props) {
    super(props)

  }



  // Make an onClick for each list item. If the movies shown is the search results, 
  // onClick add it to the database (do it in the main app, and pass down the function)

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)

  render() {
    return (
      <ul className="movies">
        {/* Make this list dynamic! */}
        {this.props.movies.map(item => {
          return (
            <li className="movie_item" onClick={this.props.saveItem.bind(this)}>
            <img src= {this.props.showFaves ? item.poster_path : `http://image.tmdb.org/t/p/w500/${item.poster_path}`} />
            <div className="movie_description"  value={item.original_title}>
              <h2>{item.original_title}</h2>
              <section className="movie_details">
                <div className="movie_year">
                  <span className="title">Year</span>
                  <span value={item.release_date}>{item.release_date}</span>
                </div>
                <div className="movie_rating">
                  <span className="title">Rating</span>
                  <span value={item.vote_average}>{item.vote_average}</span>
                </div>
              </section>
            </div>
            </li>
          )

        }) }

      </ul>
    );
  }
}

export default Movies;