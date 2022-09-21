import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuotation, updateExpense } from '../redux/actions';

class ChangeExpense extends Component {
  state = {
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',

  };

  componentDidMount() {
    const { dispatch, expenses, idToEdit } = this.props;
    dispatch(fetchQuotation());
    const chosenExpense = expenses.find((expense) => expense.id === idToEdit);
    const { value, description, currency, method, tag } = chosenExpense;
    this.setState({
      value,
      description,
      currency,
      method,
      tag,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { dispatch, idToEdit, expenses } = this.props;
    const chosenExpense = expenses.find((expense) => expense.id === idToEdit);
    const changedExpense = {
      ...chosenExpense,
      ...this.state,
    };
    dispatch(updateExpense(changedExpense));
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="expenses">
            Despesas
            <input
              type="number"
              name="value"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição da despesa
            <input
              type="textbox"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Selecione a moeda
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((element) => (
                <option key={ element } value={ element }>{element}</option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
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
            Categoria
            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
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
        <button type="button" onClick={ this.handleClick }>
          Editar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    currencies: state.wallet.currencies,
    expenses: state.wallet.expenses,
    idToEdit: state.wallet.idToEdit,
  }
);

ChangeExpense.propTypes = {
  dispatch: propTypes.func.isRequired,
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
  expenses: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      value: propTypes.string,
      description: propTypes.string,
      currency: propTypes.string,
      method: propTypes.string,
      tag: propTypes.string,
    }),
  ).isRequired,
  idToEdit: propTypes.number.isRequired,
};

export default connect(mapStateToProps)(ChangeExpense);
