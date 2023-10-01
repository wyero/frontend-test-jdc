import React from "react";
import style from "./style.module.css";

const Card = (props) => {
  return (
    <div className={`${style.card} ${props.className || null}`}>
      {props.children}
    </div>
  );
};

export default Card;
