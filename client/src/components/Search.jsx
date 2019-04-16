import React from 'react';


class Search extends React.Component {
  constructor(props) {
    super(props)

  }


  render() {

    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select onChange={this.props.changeGenre} value={this.props.genre}>
          {this.props.genres.map(genre => <option key = {genre} value={genre}>{genre}</option>)}
        </select>
        <br/><br/>

        <button onClick={this.props.handleClick}>Search</button>

      </div>
    );
  }
}



export default Search;