import ReactDOM from "react-dom";
import React, { Component } from "react";
import "./css/Torrents.css";
import Modal from "./componments/Modal";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      openModal: false,
      Movie: {},
    };
    this.appState = this.setState.bind(this);
  }
  modalOpen = (event) => {
    this.state.movies.forEach((movie) => {
      if (movie.Poster === event.target.src)
        this.setState(
          {
            Movie: movie,
            openModal: true,
          },
          this.MovieData
        );
    });
  };
  MovieData() {
    console.log(this.state.Movie);
    axios
      .get(`http://localhost:5000/imdbID=${this.state.Movie.imdbID}`)
      .then((response) => {
        if (response.data)
          this.setState((prevState) => {
            let Movie = prevState.Movie;
            Movie.Plot = response.data.Plot;
            return { Movie };
          });
      });
    axios
      .get(
        `http://localhost:5000/movie=${(
          this.state.Movie.Title +
          " " +
          this.state.Movie.Year
        ).replace(" ", "%20")}`
      )
      .then((response) => {
        if (response.data)
          this.setState((prevState) => {
            let Movie = prevState.Movie;
            Movie.magnets = response.data;
            return { Movie };
          });
      });
  }
  handleChange = (event) => {
    let sBox = event.target.value;
    if (sBox.length > 2) {
      axios
        .get(`http://localhost:5000/search=${sBox.replace(" ", "%20")}`)
        .then((response) => {
          if (response.data) this.setState({ movies: response.data });
        });
    } else this.setState({ movies: [] });
  };
  render() {
    let rows = [];
    for (let i = 0; i < this.state.movies.length; i++) {
      rows.push(
        <div key={i} className="Torrents-MovieImg">
          <img
            src={this.state.movies[i].Poster}
            onClick={this.modalOpen}
            alt={this.state.movies[i].Title}
          />
          <div className="Torrents-MovieName">
            {`${this.state.movies[i].Title} (${this.state.movies[i].Year})`}
          </div>
        </div>
      );
    }
    return (
      <>
        <div className="Torrents-Top">
          <h1>Torrents</h1>
          <input onChange={this.handleChange} placeholder="Search"></input>
        </div>
        <div className="Torrents-Main">{rows}</div>
        {this.state.openModal ? (
          <Modal appState={this.appState} Movie={this.state.Movie}></Modal>
        ) : (
          <></>
        )}
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
