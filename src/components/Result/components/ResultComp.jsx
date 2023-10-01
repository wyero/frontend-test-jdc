import style from "../style.module.css";

export const ResultText = (props) => {
  return (
    <div className={style["result-content"]}>
      {props.image ? (
        <div className={style["result-content__image"]}>
          <p className={style.name}>{props.label}</p>
          <img
            src={URL.createObjectURL(props.image)}
            alt={props.label}
            className={style.imageKTP}
          />
        </div>
      ) : (
        <>
          <p>{props.label}</p>
          <p>{props.value}</p>
        </>
      )}
    </div>
  );
};

// export const ResultImage = (props) => {
//   return (
//     <div className={style["result-content__image"]}>
//       <p className={style.name}>{props.label}</p>
//       <img src={URL.createObjectURL(props.image)} alt={props.label} className={style.imageKTP} />
//     </div>
//   );
// };
