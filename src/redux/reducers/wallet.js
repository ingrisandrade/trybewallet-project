import { ADD_WALLET } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case ADD_WALLET:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
