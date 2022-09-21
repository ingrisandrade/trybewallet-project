import { RECEIVE_QUOTATION, ADD_WALLET, DELETE_EXPENSE } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  total: 0,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case RECEIVE_QUOTATION:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_WALLET:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          ...action.payload,
          id: state.expenses.length,
        },
      ],
      total: [...state.expenses, action.payload]
        .reduce(
          (acc, { value, currency, exchangeRates }) => {
            const totalValue = acc + value * exchangeRates[currency].ask;
            return totalValue;
          },
          0,
        ),
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  default:
    return state;
  }
};

export default wallet;
