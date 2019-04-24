export const FETCH_CARS = "FETCH_CARS";
export const FETCH_CAR = "FETCH_CAR";
export const CREATE_CAR = "CREATE_CAR";
export const DELETE_CAR = "DELETE_CAR";

export function fetchCars(garageName) {
  const promise = fetch(
    `https://wagon-garage-api.herokuapp.com/${garageName}/cars`
  ).then(response => response.json());

  return {
    type: FETCH_CARS,
    payload: promise
  };
}

export function fetchCar(carID) {
  const promise = fetch(
    `https://wagon-garage-api.herokuapp.com/cars/${carID}`
  ).then(response => response.json());

  return {
    type: FETCH_CAR,
    payload: promise
  };
}

export function createCar(garageName, body, callback) {
  const request = fetch(
    `https://wagon-garage-api.herokuapp.com/${garageName}/cars`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }
  )
    .then(response => response.json())
    .then(callback);
  return {
    type: CREATE_CAR,
    payload: request
  };
}

export function deleteCar(carID, callback) {
  const request = fetch(
    `https://wagon-garage-api.herokuapp.com/cars/${carID}`,
    {
      method: "DELETE"
    }
  )
    .then(response => response.json())
    .then(callback);
  return {
    type: DELETE_CAR,
    payload: request
  };
}
