import { useAppDispatch } from '@hooks/index';
import { loginAction } from '@store/thunks/auth';
import { ChangeEvent, FormEvent, useState } from 'react';

type TLoginData = {
  email: string;
  password: string;
}

function LoginForm() {
  const [loginData, setLoginData] = useState<TLoginData>({
    email: '',
    password: ''
  });
  const dispatch = useAppDispatch();

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget;

    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(loginAction(loginData));
  };

  return (
    <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          value={loginData.email}
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          value={loginData.password}
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          pattern='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$'
          required
          onChange={handleChange}
        />
      </div>
      <button
        className="login__submit form__submit button"
        type="submit"
      >
      Sign in
      </button>
    </form>
  );
}

export default LoginForm;
