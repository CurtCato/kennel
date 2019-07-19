import React, { Component } from "react";

export default class OwnerList extends Component {
  render() {
    return (
      <section className="owners">
        {this.props.owners.map(owner => (
          <div key={owner.id} className="card">
            <div className="card-body">
              <div className="card-title">
                <h5>
                  {owner.name} {owner.phoneNumber}
                </h5>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    this.props.history.push(`/owners/${owner.id}/edit`);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => this.props.deleteOwner(owner.id)}
                  className="card-link"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }
}
