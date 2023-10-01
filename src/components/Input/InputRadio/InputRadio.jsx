import React from "react";
import style from '../../userInput/style.module.css';

const InputRadio = (props) => {
  return (
    <div className={style[""]}>
      <div className={style.gender}>
        <input
          type="radio"
          id={props.id}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          onClick={props.onClick || null}
          required
        />
        <label htmlFor={props.id}>{props.label}</label>
      </div>
    </div>
  );
};

export default InputRadio;
