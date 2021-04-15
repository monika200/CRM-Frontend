import './style.css';

import React from 'react';

import { useForm } from 'react-hook-form';

export const Form = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token,
        edit: localStorage.edit,
        type: localStorage.type,
      },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:5000/users", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        
      });
    (() => {
      window.location.reload(false);
    })();
  };

  return (
    <div className="App">
      <center>
        <h3>Customer Request Form</h3>
      </center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          ID
          <input
            name="id"
            ref={register({
              required: true,
            })}
          />
        </label>
        <select
          name="edit"
          ref={register({
            required: true,
          })}
        >
          <option value="false" selected>FALSE</option>
          <option value="true" >
            TRUE
          </option>
        </select>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Form;
