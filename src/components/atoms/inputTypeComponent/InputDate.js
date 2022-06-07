import React from "react";

const InputDate = ({ label, onChange }) => {
  return (
    <fieldset>
      <div className="form-group">
        <label>{label}</label>
        <input
          type="date"
          className="form-control"
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </fieldset>
  );
};

export default InputDate;