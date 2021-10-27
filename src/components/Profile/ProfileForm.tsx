import classes from './ProfileForm.module.css';
import React, { useRef, useContext } from 'react'
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInputRef = useRef<HTMLInputElement>(null);
  const authCtx =  useContext(AuthContext)

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()

    const enteredNewPassword = newPasswordInputRef.current?.value;

    //add validation

    //change the password
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCjkamaH6_f3FIV326hC6NB1sWzjGCzZa8', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword ,
        returnSecureToken: false
      }) ,
      headers: {"Content-Type":"application/json"}
    }).then(res => {
      history.replace('/')
    })
  }

  return (
    <div>
        <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.control}>
          <label htmlFor='new-password'>New Password</label>
          <input type='password' id='new-password' ref={newPasswordInputRef} minLength={7} />
        </div>
        <div className={classes.action}>
          <button>Change Password</button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
