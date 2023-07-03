function FormRegister({textButton, handleSubmit, handleChange, formValue}) {
  return (
    <form onSubmit={handleSubmit} className="form-register">
      <input
        required
        className="form-register__input"
        id="email"
        name="email"
        type="email"
        value={formValue.email}
        onChange={handleChange}
        placeholder="Email:"
      />

      <input
      
        required
        className="form-register__input"
        id="password"
        name="password"
        type="password"
        value={formValue.password}
        onChange={handleChange}
        placeholder="Пароль:"
      />
      <div className="form-register__button-container">
        <button type="submit" className="form-register__btn">
          {textButton}
        </button>
      </div>
    </form>
  );
}

export default FormRegister;
