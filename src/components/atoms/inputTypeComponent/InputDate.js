import React from "react";

const InputDate = ({ label, onChange, value }) => {
  return (
    <fieldset>
      <div className="form-group">
        <label>{label}</label>
        <input
          type="date"
          className="form-control"
          onChange={(event) => onChange(event.target.value)}
          value={value}
        />
      </div>
    </fieldset>
  );
};

export default InputDate;