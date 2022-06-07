import React from "react";

const InputText = ({ label, onChange, placeholder }) => {
  return (
    <fieldset>
      <div className="form-group">
        <label>{label}</label>
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </fieldset>
  );
};

export default InputText;
