import React from "react";
import style from '../../userInput/style.module.css';

const Dropdown = (props) => {
  return (
    <div className={style["form-control"]}>
      <label htmlFor={props.id}>{props.label}</label>
      <select
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        required
      >
        <option value="">{props.sub}</option>
        {props.options.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
