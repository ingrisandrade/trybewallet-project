export const ADD_EMAIL = 'ADD_EMAIL'; // action type
export const ADD_WALLET = 'ADD_WALLET';
export const RECEIVE_QUOTATION = 'RECEIVE_QUOTATION';

export const addEmail = (payload) => ( // action creator
  {
    type: ADD_EMAIL,
    payload,
  }
);

const addWallet = (payload) => (
  {
    type: ADD_WALLET,
    payload,
  }
);

const receiveQuotation = (payload) => (
  {
    type: RECEIVE_QUOTATION,
    payload,
  }
);

export const fetchQuotation = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  delete data.USDT;
  const dataArr = Object.keys(data);
  dispatch(receiveQuotation(dataArr));
};

export const fetchExpenses = (payload) => async (dispatch) => {
  const { value, description, currency, method, tag } = payload;
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const exchangeRates = await response.json();
  delete exchangeRates.USDT;
  const payloadObject = {
    id: 0,
    value,
    description,
    currency,
    method,
    tag,
    exchangeRates,
  };
  dispatch(addWallet(payloadObject));
};
