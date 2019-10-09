import React, { Component } from 'react';
import shortid from 'shortid';
import { ToastContainer, toast } from 'react-toastify';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import 'react-toastify/dist/ReactToastify.css';

class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
    summ: 0,
    income: 0,
    expenses: 0,
  };

  handleChange = e => {
    const summ = Number(e.target.value);
    this.setState({ summ });
  };

  clearInput = () => {
    this.setState({ summ: 0 });
  };

  onDeposit = () => {
    const { summ, balance, transactions } = this.state;

    const eachTranth = {
      id: shortid.generate(),
      amount: summ,
      type: 'deposit',
      // date: Date.prototype.toLocaleString(),
    };

    if (summ === 0 || summ === '') {
      toast.error('Введите сумму для проведения операции!');
    } else {
      this.setState({
        balance: balance + Number(eachTranth.amount),
        transactions: [...transactions, eachTranth],
      });
      this.income();
    }
    this.clearInput();
  };

  onWithdraw = () => {
    const { summ, balance, transactions } = this.state;
    const eachTranth = {
      id: shortid.generate(),
      amount: summ,
      type: 'withdrawal',
      // date: Date.prototype.toLocaleString(),
    };
    if (balance < summ) {
      toast.error('На счету недостаточно средств для проведения операции!');
    } else if (summ === 0 || summ === '') {
      toast.error('Введите сумму для проведения операции!');
    } else {
      this.setState({
        balance: balance - Number(eachTranth.amount),
        transactions: [...transactions, eachTranth],
      });
      this.expenses();
    }
    this.clearInput();
  };

  income = () => {
    const { summ } = this.state;
    this.setState(prevState => ({ income: prevState.income + summ }));
  };

  expenses = () => {
    const { summ } = this.state;
    this.setState(prevState => ({ expenses: prevState.expenses + summ }));
  };

  render() {
    const { transactions, balance, income, expenses, summ } = this.state;
    return (
      <div className="dashboard">
        <Controls
          handleChange={this.handleChange}
          onDeposit={this.onDeposit}
          onWithdraw={this.onWithdraw}
          addTrans={this.addTrans}
          id={this.randomId}
          value={summ}
        />
        <Balance balance={balance} income={income} expenses={expenses} />
        <TransactionHistory items={transactions} />
        <ToastContainer />
      </div>
    );
  }
}

export default Dashboard;
