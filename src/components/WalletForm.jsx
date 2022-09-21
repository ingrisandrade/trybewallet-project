import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuotation } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchQuotation());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="expenses">
            Despesas
            <input type="text" data-testid="value-input" />
          </label>
          <label htmlFor="description">
            Descrição da despesa
            <input type="textbox" data-testid="description-input" />
          </label>
          <label htmlFor="currency">
            Selecione a moeda
            <select data-testid="currency-input">
              {currencies.map((currencie) => (
                <option key={ currencie }>{currencie}</option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select data-testid="method-input">
              <option>
                Dinheiro
              </option>
              <option>
                Cartão de crédito
              </option>
              <option>
                Cartão de débito
              </option>
            </select>
          </label>
          <label htmlFor="category">
            <select data-testid="tag-input">
              <option>
                Alimentação
              </option>
              <option>
                Lazer
              </option>
              <option>
                Trabalho
              </option>
              <option>
                Transporte
              </option>
              <option>
                Saúde
              </option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    currencies: state.wallet.currencies,
  }
);

WalletForm.propTypes = {
  dispatch: propTypes.func.isRequired,
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
