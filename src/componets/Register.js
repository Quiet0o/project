import React from "react";
import { useFormik } from "formik";

const Register = () => {
  const validate = (values) => {
    const errors = {};
   
  };

  const formik = useFormik({
    initialValues: { nick: "", email: "", password: "", password_repeat: "" },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        id="nick"
        type="text"
        placeholder="podaj nick"
        required
        {...formik.getFieldProps("nick")}
      />

      <br />

      <input
        id="email"
        type="email"
        placeholder="podaj email"
        {...formik.getFieldProps("email")}
        required
      />

      <br />

      <input
        id="password"
        type="password"
        placeholder="podaj password"
        {...formik.getFieldProps("password")}
        required
      />

      <br />

      <input
        id="password_repeat"
        type="password"
        placeholder="powtorz password"
        {...formik.getFieldProps("password_repeat")}
        required
      />

      {formik.errors.password_repeat ? (<div>{formik.errors.password_repeat}</div>) : null}
      <br />

      <button type="submit" onClick={validate}>
        Submit
      </button>

    </form>
  );
};

export default Register;
