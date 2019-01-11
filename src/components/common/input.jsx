import React from "react";

const Innput = ({ name, value, label, error, onChange, type, autoFocus }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        name={name}
        autoFocus={autoFocus}
        onChange={onChange}
        id={name}
        className="form-control"
        type={type}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Innput;
