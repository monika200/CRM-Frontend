import './style.css';

import React from 'react';

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

export const Form = () => {
  const { register, errors, handleSubmit } = useForm()
  const history = useHistory()

  const onSubmit = data => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    fetch('http://localhost:5000/login', requestOptions)
      .then(response => response.json())
      .then(data => {
        try {
          if (data.token) {
            localStorage.token = data.token
            localStorage.edit = data.edit
            localStorage.type = data.type
            history.push('/home')
          } else alert(data.message)
        } catch (e) {
          alert(e.message)
        }
      })
  }

  return (
    <div className='App'>
      <center>
        <h1>Sign In Form</h1>
      </center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          type='email'
          name='email'
          ref={register({
            required: true
          })}
        />
        {errors.email?.type === 'required' && <p>Please Enter Your Email ID</p>}
        <label>Password</label>
        <input
          type='password'
          name='password'
          ref={register({
            required: true,
            minLength: 8
          })}
        />
        {errors.password?.type === 'required' && (
          <p>Please Enter Your Password</p>
        )}

        <input type='submit' value='Sign In' />
      </form>
    </div>
  )
}

export default Form
