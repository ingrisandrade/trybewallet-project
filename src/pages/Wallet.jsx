import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import ChangeExpense from '../components/ChangeExpense';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    const { editor } = this.props;
    return (
      <div>
        <Header />
        {editor ? <ChangeExpense /> : <WalletForm /> }
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  editor: state.wallet.editor,
});

Wallet.propTypes = {
  editor: propTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Wallet);
