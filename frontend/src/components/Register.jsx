import FormRegister from "./FormRegister";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import auth from "../utils/Auth";
import InfoToolTip from "./InfoToolTip";

function Register({ handleRegister, onSuccess }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    auth
      .register(formValue.email, formValue.password)
      .then(() => {
        handleRegister();
        onSuccess(true);
        setFormValue({ email: "", password: "" });
        navigate("/sing-in", { replace: true });
      })
      .catch((err) => {
        onSuccess(false);
        handleRegister();
        console.log(err);
      });
  };
  return (
    <div className="auth-page">
      <h1 className="auth-page__title">Регистрация</h1>
      <FormRegister
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formValue={formValue}
        textButton="Зарегестрироваться"
      />
      <div className="auth-page__singin">
        <p className="auth-page__text">Уже зарегистрированы?</p>
        <Link className="auth-page__link" to="/sign-in">
          {"Войти"}
        </Link>
      </div>
    </div>
  );
}
export default Register;
