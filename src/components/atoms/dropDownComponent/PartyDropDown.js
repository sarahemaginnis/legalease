import React from "react";

const PartyDropDown = ({ label, optionList, onChange, value }) => {
  return (
    <fieldset>
      <div className="form-group">
        <label htmlFor="partyRole">{label}</label>
        <select value={value} onChange={(event) => onChange(parseInt(event.target.value))}>
          //need to map through parties table
          {optionList.map((e) => (
            <option
              key={`party--${e.id}`}
              value={e.id}
            >
              {e.party}
            </option>
          ))}
        </select>
      </div>
    </fieldset>
  );
};

export default PartyDropDown;
