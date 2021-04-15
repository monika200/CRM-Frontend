import './style.css';

import React from 'react';

import { useForm } from 'react-hook-form';

export const Form = () => {
  const { register, handleSubmit } = useForm();
  //const history = useHistory();

  const onSubmit = (data) => {
    data.state = "Created";
    alert(JSON.stringify(data));
    const requestOptions = {
      method: "POST",
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
        <h3>Customer Request Form</h3>
      </center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input type="text" name="name" ref={register({ required: true })} />
        <label>Email</label>
        <input
          type="email"
          name="email"
          ref={register({
            required: true,
          })}
        />
        <label>Problem</label>
        <input
          type="text"
          name="problem"
          ref={register({
            required: true,
          })}
        />

        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

export default Form;
