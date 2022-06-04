import React from "react";

const ClassDropDown = ({ label, optionList, onChange, value }) => {
  return (
    <fieldset>
      <div className="form-group">
        <label htmlFor="casebook">{label}</label>
        <select value={value} onChange={(event) => onChange(parseInt(event.target.value))}>
          //need to map through classes table
          {optionList.map((e) => (
            <option
              key={`class--${e.id}`}
              value={e.id}
            >
              {e.casebook}
            </option>
          ))}
        </select>
      </div>
    </fieldset>
  );
};

export default ClassDropDown;