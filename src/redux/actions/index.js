export const ADD_EMAIL = 'ADD_EMAIL'; // action type
export const ADD_WALLET = 'ADD_WALLET';

const addEmail = (payload) => ( // actoion creator
  {
    type: ADD_EMAIL,
    payload,
  }
);

const addWallet = () => (
  {
    type: ADD_WALLET,
    payload,
  }
);

export { addEmail, addWallet };
