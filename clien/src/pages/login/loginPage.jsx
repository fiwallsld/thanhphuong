import FormLogin from "../../components/Form/FormLogin";
import Header from "../../components/header/Header";

import "./login.css";

function Login() {
  return (
    <>
      <Header />
      <div className="form-container">
        <FormLogin />
      </div>
    </>
  );
}

export default Login;
