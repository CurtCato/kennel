const remoteURL = "http://localhost:5002"

export default {
  get(resource, id) {
    return fetch(`${remoteURL}/${resource}/${id}`).then(animalData => animalData.json())
  },
  getAll(resource) {
    return fetch(`${remoteURL}/${resource}`).then(animalData => animalData.json())
  },
  post(newAnimal) {
    return fetch(`${remoteURL}/animals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newAnimal)
    }).then(data => data.json())
  },
  put(resource, editedData) {
    return fetch(`${remoteURL}/${resource}/${editedData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedData)
    }).then(data => data.json());
  },
}

