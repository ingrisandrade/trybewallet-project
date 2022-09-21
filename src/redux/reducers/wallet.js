import {
  RECEIVE_QUOTATION, ADD_WALLET, DELETE_EXPENSE, CHANGE_EXPENSE, UPDATE_EXPENSE,
} from '../actions';

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
  case CHANGE_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  case UPDATE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.expense.id) {
          return { ...action.expense };
        }
        return expense;
      }),
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
