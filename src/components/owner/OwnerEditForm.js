import React, { Component } from "react";
import APIManager from "../../modules/APIManager";

export default class OwnerEditForm extends Component {
  // Set initial state
  state = {
    OwnerName: "",
    phoneNumber: "",
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingOwner = evt => {
    evt.preventDefault();
    {
      const editedOwner = {
        id: this.props.match.params.ownerId,
        name: this.state.ownerName,
        phoneNumber: this.state.phoneNumber,
      };
      this.props
        .updateOwner(editedOwner)
        .then(() => this.props.history.push("/owners"));
    }
  };

  componentDidMount() {
    APIManager.get("owners", this.props.match.params.ownerId).then(owner => {
      this.setState({
        ownerName: owner.name,
        phoneNumber: owner.phoneNumber
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <form className="ownerForm">
          <div className="form-group">
            <label htmlFor="ownerName">owner name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="ownerName"
              value={this.state.ownerName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="phoneNumber"
              value={this.state.phoneNumber}
            />
          </div>
          <button
            type="submit"
            onClick={this.updateExistingOwner}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}