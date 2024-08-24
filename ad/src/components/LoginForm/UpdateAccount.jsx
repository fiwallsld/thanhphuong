import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/useContext";
import styles from "./Login.module.css";
import alertify from "alertifyjs";

function FormUpdateAccount({ userId, onClick }) {
  const navigate = useNavigate();
  const userAxios = useUser().userAxios;
  const [errorDataInput, setErrorDataInput] = useState({});
  const [resSuccess, setResSuccess] = useState(null);

  const [dataInput, setDataInput] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await userAxios.get(`/users/${userId}`);
        setDataInput({
          ...dataInput,
          username: res.data.user.username,
        });
      } catch (err) {
        alertify.set("notifier", "position", "top-center");
        alertify.error(`Something went wrong!`);
      }
    };
    getData();
  }, [userId]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setDataInput({
      ...dataInput,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(dataInput);
    try {
      const res = await userAxios.post(`/users/${userId}`, {
        data: dataInput,
      });

      setResSuccess(res.data);

      alertify.set("notifier", "position", "top-center");
      alertify.success(`Update user is successfully`);

      setTimeout(() => {
        setResSuccess(null);
        setErrorDataInput({});
        navigate("/users");
      }, 1000);
    } catch (err) {
      setErrorDataInput(err.response.data);
    }
  };

  return (
    <form className={`${styles.contain} text-center`} onSubmit={handleSubmit}>
      <h2 className={`${styles.title} mb-2`}>Reset Password</h2>
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
          <input
            type="password"
            name="confirmPassword"
            value={dataInput.confirmPassword}
            onChange={handleOnChange}
            placeholder="Confirm Password"
            className={`${errorDataInput.confirmPassword ? styles.danger : ""}`}
          />
          {errorDataInput.confirmPassword && (
            <span className={`${styles.textDanger} mb-2`}>
              {errorDataInput.confirmPassword}
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
        UPDATE
      </button>
      <button
        className={`myBtn ${styles.formBtn} mb-3`}
        type="button"
        onClick={() => onClick()}
      >
        CANCEL
      </button>
    </form>
  );
}

export default FormUpdateAccount;
