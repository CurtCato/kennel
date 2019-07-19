import React, { Component } from "react"

export default class Location extends Component {
    state = {
        saveDisabled: false
    }

    render() {
        return (
            <section className="location">
                <div key={ this.props.location.id } className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            { this.props.location.address }
                        </h4>
                        <section className="employees">
                            {
                                this.props.employees.map(employee =>
                                <ul>{employee.name}</ul>
                                )}
                        </section>
                        <h6 className="card-title">{ this.props.location.name }</h6>
                        <button onClick={
                                () => {
                                    this.setState(
                                        { saveDisabled: true },
                                        () => this.props.dischargeLocation(this.props.location.id)
                                    )
                                }
                            }
                            disabled={ this.state.saveDisabled }
                            className="card-link">Delete</button>
                    </div>
                </div>
            </section>
        )
    }
}