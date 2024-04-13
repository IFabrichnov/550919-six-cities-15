import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndProviders } from '@utils/mock-component';
import LoginForm from './login-form';

describe('Component: Login form', () => {
  it('should render correctly when user enter login and password', async () => {
    renderWithRouterAndProviders(<LoginForm />);

    const loginInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button');

    const expectedEmail = 'test@test.com';
    const expectedPassword = '123456';

    await userEvent.type(
      loginInput,
      expectedEmail
    );

    await userEvent.type(
      passwordInput,
      expectedPassword
    );

    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(loginInput).toHaveValue(expectedEmail);
    expect(passwordInput).toHaveValue(expectedPassword);
  });
});
