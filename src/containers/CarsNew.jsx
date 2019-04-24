import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { createCar } from "../actions";

export class CarsNew extends React.Component {
  onSubmit = values => {
    this.props.createCar(this.props.garageName, values, () => {
      this.props.history.push("/"); // Navigate after submit
    });
  };

  renderField = ({
    input,
    label,
    placeholder,
    type,
    meta: { touched, error, warning }
  }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={placeholder} type={type} />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  );

  required = value => {
    if (value) {
      return undefined;
    }
    return "Required";
  };

  plateValidation = str => {
    if (/^[A-Z0-9-]*$/.test(str)) {
      return undefined;
    }
    return "only cap letters, numbers and dashes(-)";
  };

  render() {
    return (
      <div className="car-index">
        <div className="left-part">
          <img className="garage-image" src="../../assets/garage.svg" />
          <div>Garage {this.props.garageName}</div>
          <Link to="/">
            <button className="btn btn-primary">Back to car list</button>
          </Link>
        </div>

        <div className="right-part">
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field
              className="form-control"
              name="brand"
              label="Brand"
              placeholder="Aston Martin"
              type="text"
              component={this.renderField}
              validate={this.required}
            />
            <Field
              className="form-control"
              name="model"
              label="Model"
              placeholder="Flash"
              type="text"
              component={this.renderField}
              validate={this.required}
            />
            <Field
              className="form-control"
              name="owner"
              label="Owner"
              placeholder="Lucky Luke"
              type="text"
              component={this.renderField}
              validate={this.required}
            />
            <Field
              className="form-control"
              name="plate"
              label="Plate"
              placeholder="XX-FFF-69"
              type="text"
              component={this.renderField}
              validate={[this.required, this.plateValidation]}
            />
            <button
              className="btn btn-primary"
              type="submit"
              disabled={this.props.pristine || this.props.submitting}
            >
              Create a car
            </button>
          </form>
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

export default reduxForm({ form: "newCarForm" })(
  connect(
    MapStateToProps,
    { createCar }
  )(CarsNew)
);
