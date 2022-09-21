import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalExpense = expenses.reduce((acc, { value, currency, exchangeRates }) => {
      const total = acc + (value * exchangeRates[currency].ask);
      return total;
    }, 0);
    return (
      <div>
        <h2 data-testid="email-field">
          {email}
        </h2>
        <h2 data-testid="total-field">{totalExpense.toFixed(2)}</h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    email: state.user.email,
    expenses: state.wallet.expenses,
  }
);

Header.propTypes = {
  email: propTypes.string.isRequired,
  expenses: propTypes.arrayOf(propTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Header);
