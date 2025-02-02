import React, { Component } from 'react'
import {Link} from "react-router-dom"


export default class LocationList extends Component {
  render() {
    return (
      <section className="locations">
      {
        this.props.locations.map(location =>
            <div key={location.id} className="card">
              <div className="card-body">
                <div className="card-title">
                  <h5>{location.name}</h5>
                  <Link className="nav-link" to={`/locations/${location.id}`}>Details</Link>
                  <button
                    onClick={() => this.props.deleteLocation(location.id)}
                    className="card-link">Delete</button>
                </div>
              </div>
            </div>
        )
      }
      </section>
    )
  }
}
