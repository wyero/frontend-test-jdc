import React from "react";
import style from '../../userInput/style.module.css';

const InputText = (props) => {
  return (
    <div className={style["form-control"]}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        accept={props.accept || null}
        required
      />
    </div>
  );
};

export default InputText;