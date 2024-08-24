import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/useContext";

import styles from "./Login.module.css";

function FormLogin() {
  const navigate = useNavigate();
  const { user, setUser, userAxios } = useUser();

  const [errorDataInput, setErrorDataInput] = useState({});
  const [resSuccess, setResSuccess] = useState(null);

  const [dataInput, setDataInput] = useState({
    username: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setDataInput({
      ...dataInput,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await userAxios.post(`auth?mode=login`, {
        data: dataInput,
      });

      setUser(res.data.user);
      localStorage.setItem(
        "adminUser",
        JSON.stringify({
          username: res.data.user.username,
          password: res.data.user.password,
        })
      );
      // console.log(res.data.user);

      setResSuccess(res.data);

      setTimeout(() => {
        setResSuccess(null);
        setErrorDataInput({});
        navigate("/");
      }, 1500);
    } catch (err) {
      setErrorDataInput(err.response.data);
    }
  };

  return (
    <form className={`${styles.contain} text-center`} onSubmit={handleSubmit}>
      <h2 className={`${styles.title} mb-2`}>Login</h2>
      <hr className="mb-3" />
      {resSuccess ? (
        <div className="mb-3">
          <h2 className="mb-1">{resSuccess.mesSuccess}</h2>
          <p>{`Redirecting to DashBoard...`}</p>
        </div>
      ) : (
        <div className={`${styles.inputs} my-3`}>
          <input
            type="text"
            name="username"
            value={dataInput.username}
            onChange={handleOnChange}
            placeholder="User name"
            className={`${errorDataInput.username ? styles.danger : ""} w-100`}
          />
          {errorDataInput.username && (
            <span className={`${styles.textDanger} mb-2`}>
              {errorDataInput.username}
            </span>
          )}
          <input
            type="password"
            name="password"
            value={dataInput.password}
            onChange={handleOnChange}
            placeholder="Password"
            className={`${errorDataInput.password ? styles.danger : ""}`}
          />
          {errorDataInput.password && (
            <span className={`${styles.textDanger} mb-2`}>
              {errorDataInput.password}
            </span>
          )}
        </div>
      )}

      <button
        className={`myBtn ${styles.formBtn} mb-3 ${
          resSuccess ? "disabled" : ""
        }`}
        type="submit"
        disabled={resSuccess ? true : false}
      >
        LOGIN
      </button>
    </form>
  );
}

export default FormLogin;
