import React from "react";

//const Input = ({ name, label, error, value, type, onChange }) => {
const Input = ({ name, label, error,  ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        //value={value}
        name={name}
        //onChange={onChange}
        id={name}
        className="form-control"
        //type={type}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
