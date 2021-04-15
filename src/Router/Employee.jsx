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
    fetch("http://localhost:5000/customer", requestOptions)
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
        <h3>Customer Update Form</h3>
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
          name="state"
          ref={register({
            required: true,
          })}
        >
          <option value="Created">Created</option>
          <option value=" In process">In process</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Form;
