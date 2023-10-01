import React from 'react';
import style from './style.module.css';

const LoadingSpinner = () => {
  return (
    <div className={style["spinner-container"]}>
      <div className={style["loading-spinner"]}></div>
    </div>
  )
}

export default LoadingSpinner