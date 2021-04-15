import './style.css';

import React from 'react';

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

export const Form = () => {
  const { register, errors, handleSubmit, watch } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    data.edit = "false";
    //data.type = "Admin";
    delete data.retype_password;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:5000/register", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        try {
          if (data.message === "Registration successful..!!") {
            history.push("/login");
          }
        } catch (e) {
          alert(e.message);
        }
      });
  };

  return (
    <div className="App">
      <center>
        <h1>Sign Up Form</h1>
      </center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          ref={register({ required: true })}
        />
        <label>Last Name</label>
        <input type="text" name="lastName" ref={register({ required: true })} />
        {errors.name && <p>First name is required</p>}
        <label>Email</label>
        <input
          type="email"
          name="email"
          ref={register({
            required: true,
          })}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          ref={register({
            required: true,
          })}
        />

        <label>Retype Password</label>
        <input
          type="password"
          name="retype_password"
          ref={register({
            required: true,
          })}
        />
        {watch("password") !== watch("retype_password") && (
          <p>Retype the Correct Password</p>
        )}

        <label>Type of Sign Up</label>
        <select
          name="type"
          ref={register({
            required: true,
          })}
        >
          <option disabled selected hidden>
            Select your Type
          </option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
        </select>

        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default Form;
