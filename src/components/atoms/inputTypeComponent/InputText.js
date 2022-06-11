import React from "react";

const InputText = ({ label, onChange, placeholder, value }) => {
  return (
    <fieldset>
      <div className="form-group">
        <label>{label}</label>
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          value={value}
        />
      </div>
    </fieldset>
  );
};

export default InputText;
