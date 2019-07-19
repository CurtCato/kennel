import React, { Component } from "react";
import { Link } from "react-router-dom";
import AnimalCard from "../animal/AnimalCard";
import "./employee.css";

export default class EmployeeList extends Component {
  render() {
    return (
      <section className="employees">
        {this.props.employees.map(employee => (
          <div key={employee.id} className="card">
            <div className="card-body">
              <div className="card-title">
                <h5>{employee.name}</h5>
                <Link className="nav-link" to={`/employees/${employee.id}`}>
                  Details
                </Link>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {

                    this.props.history.push(
                      `/employees/${employee.id}/edit`
                    );
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => this.props.deleteEmployee(employee.id)}
                  className="card-link"
                >
                  Delete
                </button>
              </div>
              <h6 className="card-subtitle mb-2 text-muted">Caretaker For</h6>
              <div className="animals--caretaker">
                {this.props.animals
                  .filter(anml => anml.employeeId === employee.id)
                  .map(anml => (
                    <AnimalCard key={anml.id} animal={anml} {...this.props} />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }
}
