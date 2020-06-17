import React, { Component } from "react";
import "../css/modal.css";

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = props.Movie;
    this.appState = this.props.appState;
  }

  render() {
    let magnets = [];
    if (this.state.magnets) {
      for (let i = 0; i < this.state.magnets.length; i++) {
        magnets.push(
          <div key={i}>
            <a
              className="modal-magnets-links"
              href={this.state.magnets[i].magnet}
            >
              {this.state.magnets[i].name}
            </a>
            <div className="modal-magnets-seeders">
              {this.state.magnets[i].seeders}
            </div>
            <div className="modal-magnets-seeders">
              {this.state.magnets[i].size}
            </div>
          </div>
        );
      }
    }
    return (
      <div className="modal">
        <div className="modal-content">
          <div>
            <span
              onClick={() => this.appState({ openModal: false })}
              className="modal-close"
            >
              &times;
            </span>
          </div>
          <div className="modal-title">
            <h3>{this.state.Title}</h3>
            <div>
              <img
                alt={this.state.Title}
                src={this.state.Poster}
                className="modal-poster"
              />
              <div height="300px" width="210px" className="modal-plot">
                {this.state.Plot}
              </div>
              <div className="modal-magnets">
                <h3>Magnets</h3>
                {magnets}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
