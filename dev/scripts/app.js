import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


class Catalogue extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: []
    }
  }
  componentDidMount() {
    axios.get(`https://api.themoviedb.org/3/discover/movie`, {
      params: {
        api_key: `e1bdb22bb4a72a05f85220c6d7b11684`,
        language: `en-US`,
        sort_by: `popularity.desc`,
        include_adult: `false`,
        include_video: `false`,
        page: `1`,
        primary_release_year: `1997`
      }
    }).then((res) => {
      // console.log(res);
      this.setState({
        movies: res.data.results
      })
    })
  }
  render() {
    return (
      <div>
        {this.state.movies.map(movie => {
          return (
            // Link will turn the image into a tag and will get the movie number
            <Link to={`/movie/${movie.id}`}>
              <div key={movie.id}>
                <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`The move poster for ${movie.original_title}`} />
              </div>
            </Link>
          )
        })}
      </div>
    )
  }
}

class MovieDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      movie: {}
    }
  }
  componentDidMount() {
    axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.movie_id}`, {
      params: {
        api_key: 'f012df5d63927931e82fe659a8aaa3ac'
      }
    }).then(res => {
      console.log(res);
      // destructing your object... grab me the data object and saving it into the res... same as 
      //const data = res.data; 
      // same as... movie = res.data
      const { data: movie } = res;
      this.setState({
        movie
      });

    })
  }
  render() {
    return (
      // <div>
      //   {this.props.match.params.movie_id}
      // </div>

      // once the image is clicked get all the movie information and place it in these divs
      <div>
        <div className='movie-single__poster'>
          <div className='movie-single__description'>
            <header>
              <h1>{this.state.movie.original_title}</h1>
              <h2>{this.state.movie.tagline}</h2>
              <p>{this.state.movie.overview}</p>
            </header>
          </div>
          <div className='movie-single__image'>
            <img src={`http://image.tmdb.org/t/p/w500/${this.state.movie.poster_path}`} />
          </div>
        </div>
      </div>
    )
  }
}


class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <header className='top-header'>
            <h1>HackFlix</h1>
            <nav>
              <a href="#">Catalogue</a>
            </nav>
          </header>
          {/* <Catalogue /> */}
          {/* Don't need this above catalogue and we called it below */}
          <Route exact path='/' component={Catalogue} />
          <Route exact path='/movie/:movie_id' component={MovieDetails} />
          {/* only get the router when we are at the route */}
          {/* :movie_id -- search a prop that match moive something and then show MovieDetails */}
          <Route render={() => <p>Not Found</p>} />
          {/* this will have no path ... if no path match then do something */}
          {/* it's a implicite return(single line function) therefore don't need {} or return */}
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

