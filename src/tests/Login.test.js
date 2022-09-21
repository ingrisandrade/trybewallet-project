import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('Testando a tela de login', () => {
  const emailTestId = 'email-input';
  const passwordTestId = 'password-input';
  test('Testando se os inputs de login são renderizados', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveValue('');
  });

  test('Testando a validação do botão', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const loginButton = screen.getByRole('button');

    userEvent.type(emailInput, 'xablau');
    userEvent.type(passwordInput, '12345');

    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, 'xablau@xablau.com');
    userEvent.type(passwordInput, 'xablem');

    expect(loginButton).toBeEnabled();
  });

  test('Testando se ao clicar no botão, a página é direcionada para /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const loginButton = screen.getByRole('button');

    userEvent.type(emailInput, 'xablau@xablau.com');
    userEvent.type(passwordInput, 'xablem');
    userEvent.click(loginButton);

    expect(history.location.pathname).toBe('/carteira');
  });
});
