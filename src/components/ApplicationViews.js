import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { withRouter } from "react-router";
import LocationList from "./location/LocationList";
import LocationDetail from "./location/LocationDetail";
import EmployeeList from "./employee/EmployeeList";
import EmployeeDetail from "./employee/EmployeeDetail";
import OwnerList from "./owner/OwnerList";
import AnimalList from "./animal/AnimalList";
import APIManager from "../modules/APIManager";
import AnimalDetail from "./animal/AnimalDetail";
import AnimalForm from "./animal/AnimalForm";
import Login from "./authentication/Login";
import AnimalEditForm from "./animal/AnimalEditForm"
import EmployeeEditForm from "./employee/EmployeeEditForm"
import OwnerEditForm from "./owner/OwnerEditForm"

class ApplicationViews extends Component {
  state = {
    employees: [],
    locations: [],
    animals: [],
    owners: [],
    ownersFromAPI: []
  };

  componentDidMount() {
    const newState = {};

    APIManager.getAll("animals")
      .then(animals => (newState.animals = animals))
      .then(() => fetch("http://localhost:5002/employees").then(r => r.json()))
      .then(employees => (newState.employees = employees))
      .then(() => this.setState(newState))
      .then(() => fetch("http://localhost:5002/locations").then(r => r.json()))
      .then(locations => (newState.locations = locations))
      .then(() => this.setState(newState))
      .then(() => fetch("http://localhost:5002/owners").then(r => r.json()))
      .then(owners => (newState.owners = owners))
      .then(() => this.setState(newState));
  }

  isAuthenticated = () =>
    sessionStorage.getItem("credentials") !== null ||
    localStorage.getItem("credentials") !== null;

  updateAnimal = editedAnimalObject => {
    return APIManager.put("animals", editedAnimalObject)
      .then(() => APIManager.getAll("animals"))
      .then(animals => {
        this.setState({
          animals: animals
        });
      });
  };

  addAnimal = animal =>
    APIManager.post("animal")
      .then(() => APIManager.getAll("animals"))
      .then(animals =>
        this.setState({
          animals: animals
        })
      );

  deleteAnimal = id => {
    return fetch(`http://localhost:5002/animals/${id}`, {
      method: "DELETE"
    })
      .then(APIManager.getAll("animals"))
      .then(animals => {
        this.props.history.push("/animals");
        this.setState({ animals: animals });
      });
  };

  updateEmployee = editedEmployeeObject => {
    return APIManager.put("employees", editedEmployeeObject)
      .then(() => APIManager.getAll("employees"))
      .then(employees => {
        this.setState({
          employees: employees
        });
      });
  };

  deleteEmployee = id => {
    return fetch(`http://localhost:5002/employees/${id}`, {
      method: "DELETE"
    })
      .then(APIManager.getAll("employees"))
      .then(employees => {
        this.props.history.push("/employees");
        this.setState({ employees: employees });
      });
  };

  deleteLocation = id => {
    return fetch(`http://localhost:5002/locations/${id}`, {
      method: "DELETE"
    })
      .then(APIManager.getAll("locations"))
      .then(locations => {
        this.props.history.push("/locations");
        this.setState({ locations: locations });
      });
  };

  deleteOwner = id => {
    return fetch(`http://localhost:5002/owners/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => fetch(`http://localhost:5002/owners`))
      .then(e => e.json())
      .then(owners =>
        this.setState({
          owners: owners
        })
      );
  };

  updateOwner = editedOwnerObject => {
    return APIManager.put("owners", editedOwnerObject)
      .then(() => APIManager.getAll("owners"))
      .then(owners => {
        this.setState({
          owners: owners
        });
      });
  };

  render() {
    console.log("Component was rendered");
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            if (this.isAuthenticated()) {
              return <LocationList locations={this.state.locations} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          path="/locations/:locationId(\d+)"
          render={props => {
            // Find the location with the id of the route parameter
            let location = this.state.locations.find(
              location =>
                location.id === parseInt(props.match.params.locationId)
            );

            // If the animal wasn't found, create a default one
            if (!location) {
              location = { id: 404, name: "404", place: "Location not found" };
            }

            return (
              <LocationDetail
                {...props}
                employees={this.state.employees}
                location={location}
                deleteLocation={this.deleteLocation}
              />
            );
          }}
        />
        <Route
          exact
          path="/animals"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <AnimalList
                  {...props}
                  deleteAnimal={this.deleteAnimal}
                  animals={this.state.animals}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          path="/animals/new"
          render={props => {
            return (
              <AnimalForm
                {...props}
                addAnimal={this.addAnimal}
                employees={this.state.employees}
              />
            );
          }}
        />
        <Route
          exact
          path="/animals/:animalId(\d+)"
          render={props => {
            // Find the animal with the id of the route parameter
            let animal = this.state.animals.find(
              animal => animal.id === parseInt(props.match.params.animalId)
            );
            // If the animal wasn't found, create a default one
            if (!animal) {
              animal = { id: 404, name: "404", breed: "Dog not found" };
            }

            return (
              <AnimalDetail
                {...props}
                animal={animal}
                dischargeAnimal={this.deleteAnimal}
              />
            );
          }}
        />
        <Route
          path="/animals/:animalId(\d+)/edit"
          render={props => {
            return (
              <AnimalEditForm
                {...props}
                employees={this.state.employees}
                updateAnimal={this.updateAnimal}
              />
            );
          }}
        />
        <Route
          exact
          path="/employees"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <EmployeeList
                  deleteEmployee={this.deleteEmployee}
                  employees={this.state.employees}
                  animals={this.state.animals}
                  {...props}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          exact path="/employees/:employeeId(\d+)"
          render={props => {
            // Find the employee with the id of the route parameter
            let employee = this.state.employees.find(
              employee =>
                employee.id === parseInt(props.match.params.employeeId)
            );
            // If the employee wasn't found, create a default one
            if (!employee) {
              employee = { id: 404, name: "404", person: "Employee not found" };
            }
            return (
              <EmployeeDetail
              {...props}
                employee={employee}
                dischargeEmployee={this.deleteEmployee}
              />
            );
          }}
        />
        <Route
          path="/employees/:employeeId(\d+)/edit"
          render={props => {
            return (
              <EmployeeEditForm
                {...props}
                employees={this.state.employees}
                updateEmployee={this.updateEmployee}
              />
            );
          }}
        />
        <Route
          exact path="/owners"
          render={props => {
            return (
              <OwnerList
              {...props}
                deleteOwner={this.deleteOwner}
                owners={this.state.owners}
              />
            );
          }}
        />
        <Route
          path="/owners/:ownerId(\d+)/edit"
          render={props => {
            return (
              <OwnerEditForm
                {...props}
                owners={this.state.owners}
                updateOwner={this.updateOwner}
              />
            );
          }}
        />
        <Route path="/login" component={Login} />
      </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews);
