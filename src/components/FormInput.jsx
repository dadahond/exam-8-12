import React from "react";

function FormInput({ name, type, placaholder, mainName, defaultValue }) {
  return (
    <div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">{mainName}</legend>
        <input
          id={name}
          type={type}
          className="input rounded-sm w-full dark:bg-darkSlate"
          placeholder={placaholder}
          name={name}
          defaultValue={defaultValue}
        />
      </fieldset>
    </div>
  );
}

export default FormInput;
