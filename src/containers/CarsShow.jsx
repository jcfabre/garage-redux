import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchCar } from "../actions";
import { deleteCar } from "../actions";

class CarsShow extends React.Component {
  constructor(props) {
    super(props);
    !this.props.car && this.props.fetchCar(this.props.match.params.id);
  }

  onClick = () => {
    this.props.deleteCar(this.props.match.params.id, () => {
      this.props.history.push("/"); // Navigate after submit
    });
  };

  render() {
    const { car } = this.props;
    return (
      <div className="car-index">
        <div className="left-part">
          <img className="garage-image" src="../../assets/garage.svg" />
          <div>Garage {this.props.garageName}</div>
          <Link to="/">
            <button className="btn btn-primary">Back to car list</button>
          </Link>
        </div>

        {!car && <div>loading...</div>}
        {!!car && (
          <div className="right-part">
            <div className="car-render">
              <div>
                <img
                  src="../../assets/iconmonstr-car-3.png"
                  className="car-show-image"
                />
              </div>
              <div key={car.id}>
                <div>
                  {car.brand} {car.model}
                </div>
                <div>Owner: {car.owner}</div>
                <div className="plate">{car.plate}</div>
              </div>
            </div>
            <button onClick={this.onClick}>Delete</button>
          </div>
        )}
      </div>
    );
  }
}

const MapStateToProps = (state, ownProps) => {
  const idFromUrl = parseInt(ownProps.match.params.id, 10);
  const car = state.cars.find(c => c.id === idFromUrl);

  return {
    car,
    garageName: state.garageName
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCar, deleteCar }, dispatch);
}

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(CarsShow);
