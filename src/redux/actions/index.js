export const ADD_EMAIL = 'ADD_EMAIL'; // action type
export const RECEIVE_QUOTATION = 'RECEIVE_QUOTATION';

export const addEmail = (payload) => ( // actoion creator
  {
    type: ADD_EMAIL,
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
