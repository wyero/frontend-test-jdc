import { useState } from "react";
import style from "./App.module.css";
import Result from "./components/Result/Result";
import UserInput from "./components/userInput/UserInput";

function App() {
  const [dataUser, setDataUser] = useState([]);

  const saveDataUser = (userInput) => {
    setDataUser((prevData) => {
      return [...prevData, { id: Math.random().toString(), ...userInput }];
    });
  };
  return (
    <header className={style.app}>
      {dataUser.length === 0 ? (
        <h1>pendataan penerimaan bantuan sosial</h1>
      ) : (
        <h1>review data penerimaan bantuan sosial</h1>
      )}
      {dataUser.length === 0 ? (
        <UserInput onAddDataUser={saveDataUser} />
      ) : (
        <Result onDataUser={dataUser} />
      )}
    </header>
  );
}

export default App;
