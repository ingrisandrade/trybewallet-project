import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <h2 data-testid="email-field">
          {email}
        </h2>
        <h2 data-testid="total-field">0</h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    email: state.user.email,
  }
);

Header.propTypes = {
  email: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
