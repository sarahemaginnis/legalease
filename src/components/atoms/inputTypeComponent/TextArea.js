import React from "react";

const TextArea = ({ label, onChange, value }) => {
  return (
    <fieldset>
      <div className="form-group">
        <label>{label}</label>
        <textarea
          className="form-control"
          onChange={(event) => onChange(event.target.value)}
          value={value}
        />
      </div>
    </fieldset>
  );
};

export default TextArea;
