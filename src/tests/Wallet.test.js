import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';

const fixedEmail = 'xablau@xablau.com';
const mockedState = {
  user: {
    email: fixedEmail,
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};

describe('Testando a renderização inicial da página Wallet', () => {
  const emailTestId = 'email-input';
  const passwordTestId = 'password-input';
  test('Testando se os elementos são redenrizados corretamente', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const loginButton = screen.getByRole('button');

    userEvent.type(emailInput, fixedEmail);
    userEvent.type(passwordInput, 'xablem');
    userEvent.click(loginButton);

    const email = screen.getByText(fixedEmail);
    const totalExpense = screen.getByTestId('total-field');
    const description = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const category = screen.getByTestId('tag-input');
    const actualCurrency = screen.getByTestId('header-currency-field');

    expect(email).toBeInTheDocument();
    expect(email.innerHTML).toBe(fixedEmail);
    expect(totalExpense).toBeInTheDocument();
    expect(totalExpense.innerHTML).toEqual('0.00');
    expect(description).toBeInTheDocument();
    expect(description).toHaveValue('');
    expect(currency).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(actualCurrency).toBeInTheDocument();
    expect(actualCurrency.innerHTML).toBe('BRL');
  });
  test('Testando se ao carregar a página e ao clicar no botão de adicionar despesas, a requisição é feita', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    const { store } = renderWithRouterAndRedux(<App />, {
      initialState: mockedState,
      initialEntries: ['/carteira'],
    });
    const expenseValue = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const category = screen.getByTestId('tag-input');
    const addExpense = screen.getByRole('button', { name: 'Adicionar despesa' });

    userEvent.type(expenseValue, '694');
    userEvent.type(description, 'coquinha gelada');
    userEvent.selectOptions(currency, 'CAD');
    userEvent.selectOptions(method, 'Dinheiro');
    userEvent.selectOptions(category, 'Alimentação');
    userEvent.click(addExpense);

    expect(expenseValue).toHaveValue(694);
    expect(description).toHaveValue('coquinha gelada');
    expect(currency).toHaveValue('CAD');
    expect(method).toHaveValue('Dinheiro');
    expect(category).toHaveValue('Alimentação');

    await waitFor(() => expect(global.fetch).toBeCalledTimes(2));

    const { wallet } = store.getState();
    expect(wallet.expenses).toHaveLength(1);
  });
});
