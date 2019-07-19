import React, { Component } from "react";
import dog from "./DogIcon.svg";
import "./animal.css";
import { Link } from "react-router-dom";
import AnimalCard from "./AnimalCard";

export default class AnimalList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="animalButton">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.history.push("/animals/new");
            }}
          >
            Admit Animal
          </button>
        </div>
        {this.props.animals.map(animal => (
          <AnimalCard key={animal.id} animal={animal} {...this.props} />
        ))}
      </React.Fragment>
    );
  }
}
