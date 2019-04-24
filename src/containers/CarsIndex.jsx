import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchCars } from "../actions";
import { Link } from "react-router-dom";

export class CarsIndex extends React.Component {
  componentDidMount() {
    this.props.fetchCars(this.props.garageName);
  }

  render() {
    return (
      <div className="car-index">
        <div className="left-part">
          <img className="garage-image" src="../../assets/garage.svg" />
          <div>Garage {this.props.garageName}</div>
          <Link to="/cars/new">
            <button className="btn btn-primary">Add a new car</button>
          </Link>
        </div>
        <div className="right-part">
          {!!this.props.cars &&
            this.props.cars.map(car => {
              return (
                <Link to={`/cars/${car.id}`} key={car.id}>
                  <div className="car-render">
                    <div>
                      <img
                        src="../../assets/iconmonstr-car-3.png"
                        className="car-image"
                      />
                    </div>
                    <div>
                      <div>
                        {car.brand} {car.model}
                      </div>
                      <div>Owner: {car.owner}</div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    );
  }
}

const MapStateToProps = state => {
  return {
    cars: state.cars,
    garageName: state.garageName
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCars: fetchCars }, dispatch);
}

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(CarsIndex);
