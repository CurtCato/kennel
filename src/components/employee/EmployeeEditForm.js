import React, { Component } from "react";
import APIManager from "../../modules/APIManager";

export default class EmployeeEditForm extends Component {
  // Set initial state
  state = {
    employeeName: "",
    phoneNumber: "",
    locationId: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingEmployee = evt => {
    evt.preventDefault();
    {
      const editedEmployee = {
        id: this.props.match.params.employeeId,
        name: this.state.employeeName,
        phoneNumber: this.state.phoneNumber,
      };
      this.props
        .updateEmployee(editedEmployee)
        .then(() => this.props.history.push("/employees"));
    }
  };

  componentDidMount() {
    APIManager.get("employees", this.props.match.params.employeeId).then(employee => {
      this.setState({
        employeeName: employee.name,
        phoneNumber: employee.phoneNumber
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <form className="employeeForm">
          <div className="form-group">
            <label htmlFor="employeeName">Employee name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="employeeName"
              value={this.state.employeeName}
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
            onClick={this.updateExistingEmployee}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}