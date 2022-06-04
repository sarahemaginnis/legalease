import React from "react";

const SubjectDropDown = ({ label, optionList, onChange, value }) => {
  return (
    <fieldset>
      <div className="form-group">
        <label htmlFor="class">{label}</label>
        <select value={value} onChange={(event) => onChange(parseInt(event.target.value))}>
          //need to map through subjects table
          {optionList.map((e) => (
            <option
              key={`subject--${e.id}`}
              value={e.id}
            >
              {e.name}
            </option>
          ))}
        </select>
      </div>
    </fieldset>
  );
};

export default SubjectDropDown;