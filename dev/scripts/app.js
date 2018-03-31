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
    axios.get(`https://api.themoviedb.org/3/movie/popular`, {
      params: {
        api_key: `e1bdb22bb4a72a05f85220c6d7b11684`,
        language: `en-US`,
        // sort_by: `popularity.desc`,
        // include_adult: `false`,
        // include_video: `false`,
        page: `1`,
        // primary_release_year: `1997`
      }
    }).then((res) => {
      console.log(res);
      this.setState({
        movies: res.data.results
      })
    })
  }
  render() {
    return (
      <div className="movieSection">
        {this.state.movies.map(movie => {
          return (
            // Link will turn the image into a tag and will get the movie number
            <Link to={`/movie/${movie.id}`} className="movieIndGrid">
              <div key={movie.id}>
                <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`The movie poster for ${movie.original_title}`} className="movieImg"/>
                <p className="movieGridTitle">{movie.original_title}</p>
                <p className="stars"><i class="far fa-star"></i>{movie.vote_average}</p>
              </div>
            </Link>
          )
        })}
      </div>
    )
  }
}

class TopRated extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: []
    }
  }
  componentDidMount() {
    axios.get(`https://api.themoviedb.org/3/movie/top_rated`, {
      params: {
        api_key: `e1bdb22bb4a72a05f85220c6d7b11684`,
        language: `en-US`,
        page: `1`
      }
    }).then((res) => {
      console.log(res);
      this.setState({
        movies: res.data.results
      })
    })
  }
  
  render() {
    return (
      <div className="movieSection">
        {this.state.movies.map(movie => {
          return (
            // Link will turn the image into a tag and will get the movie number
            <Link to={`/movie/${movie.id}`} className="movieIndGrid">
              <div key={movie.id}>
                <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`The movie poster for ${movie.original_title}`} className="movieImg"/>
                <p className="movieGridTitle">{movie.original_title}</p>
                <p className="stars"><i class="far fa-star"></i>{movie.vote_average}</p>
              </div>
            </Link>
          )
        })}
      </div>
    )
  }
}

class UpComing extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: []
    }
  }
  componentDidMount() {
    axios.get(`https://api.themoviedb.org/3/movie/upcoming`, {
      params: {
        api_key: `e1bdb22bb4a72a05f85220c6d7b11684`,
        language: `en-US`,
        page: `1`
      }
    }).then((res) => {
      console.log(res);
      this.setState({
        movies: res.data.results
      })
      console.log(this.state.movies)
    })
  }

  render() {
    return (
      <div className="movieSection">
        {this.state.movies.map(movie => {
          console.log(movie)
          return (
            // Link will turn the image into a tag and will get the movie number
            <Link to={`/movie/${movie.id}`} className="movieIndGrid">
              <div key={movie.id}>
                <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`The movie poster for ${movie.original_title}`} className="movieImg" />
                <p className="movieGridTitle">{movie.original_title}</p>
                <p className="stars"><i class="far fa-star"></i>{movie.vote_average}</p>
              </div>
            </Link>
          )
        })}
      </div>
    )
  }
}

class Search extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      name: "",
      movieInd: [],
      updateMovies: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.addName = this.addName.bind(this);
  }
  handleChange(e) {
    // console.log(e.target.value)
    this.setState({
      name: e.target.value,
    })
  }
  addName(e) {
    e.preventDefault();
    console.log('working!!')

    const updateName = this.state.name
    console.log(updateName)
    this.setState({
      name: updateName,
    })

    const query = this.state.name;
    axios.get(`https://api.themoviedb.org/3/search/person?`, {
      params: {
        api_key: `e1bdb22bb4a72a05f85220c6d7b11684`,
        language: `en-US`,
        query: query,
        // page: `1`
      }
    }).then((res) => {
      console.log(res);
      this.setState({
        movies: res.data.results
      })
    })
  }
  
  render() {
    return (
      <div>
        <form action="" onSubmit={this.addName}>
          <label>Search Movie</label>
          <input type="text" name="artistName" value={this.state.name} onChange={this.handleChange} />
          <button>GO</button>
        </form>


        <div className="movieSection">
          {this.state.movies.map(movie => {
            console.log(movie.id)
            const movieId = movie.id;
            console.log(movieId);
            this.state.movieInd.push(movieId)
            // this.state.movieId.push(movieId)
            console.log(this.state.movieInd)
          })}
          
          {this.state.movieInd.forEach(movie => {
            console.log(movie)
            axios.get(`https://api.themoviedb.org/3/movie/${movie}?`, {
              params: {
                // movie_id: `${movie}`,
                api_key: `e1bdb22bb4a72a05f85220c6d7b11684`,
                language: `en-US`
              }
            }).then((res) => {
              console.log(res.data);
              this.state.updateMovies.push(res.data)
              console.log(this.state.updateMovies)

              this.setState({
                updateMovies: newMovies,
              })
            })
          })}

          {this.state.updateMovies.map(movie => {
            console.log(movie)
            return (
              // Link will turn the image into a tag and will get the movie number
              <Link to={`/movie/${movie.id}`} className="movieIndGrid">
                <div key={movie.id}>
                  <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`The movie poster for ${movie.original_title}`} className="movieImg" />
                  <p className="movieGridTitle">{movie.original_title}</p>
                  <p className="stars"><i class="far fa-star"></i>{movie.vote_average}</p>
                </div>
              </Link>
            )
          })}
        </div>

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
        api_key: 'e1bdb22bb4a72a05f85220c6d7b11684'
      }
    }).then(res => {
      console.log(res);
      const { data: movie } = res;
      this.setState({
        movie
      });

    })
  }
  render() {
    return (
      <div className="indMovieSection">
        <header>
          <h2 className="indMovieTitle">{this.state.movie.original_title} <span className="indMovieDateTitle">({this.state.movie.release_date})</span></h2>
          {/* <h2>{this.state.movie.tagline}</h2> */}
          <nav className="indMovieNav">
            <p className="indMovieNavLi">{this.state.movie.runtime} mins</p>
            <p className="indMovieNavLi"><i class="far fa-star"></i> {this.state.movie.vote_average}</p>
          </nav>
        </header>
        <div className='movie-single__poster'>
          <div className='movie-single__image'>
            <img src={`http://image.tmdb.org/t/p/w500/${this.state.movie.poster_path}`} className="movieIndImg"/>
          </div>
          <div className='movie-single__description'>
              <p>{this.state.movie.overview}</p>
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
            <h1>Movies</h1>
            <p className="titleDescription">Not sure what movie to watch on your down time? Check out these out!</p>

            <nav className="mainNav">
              <Link to={`/toprated`}>
                <div>
                  <a href="">Top Rated</a>
                </div>
              </Link>
              <Link to={'/popular'}>
                <div>
                  <a href="">Popular</a>
                </div>
              </Link>
              <Link to={'/upComing'}>
                <div>
                  <a href="">Upcoming</a>
                </div>
              </Link>
              <Link to={'/search'}>
                <div>
                  <a href="">Search</a>
                </div>
              </Link>
            </nav>
          </header>

          <Route exact path='/popular' component={Catalogue} />
          <Route exact path='/movie/:movie_id' component={MovieDetails} />
          <Route exact path='/toprated' component={TopRated} />
          <Route exact path='/upcoming' component={UpComing} />
          <Route exact path='/search' component={Search} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

