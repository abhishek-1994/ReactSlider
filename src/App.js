import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import queryString from 'query-string';
import './App.css';

class App extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      amount: 500,
      months: 6,
      data: {},
      response: {}
    }

    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleMonthsChange = this.handleMonthsChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleAmountChange(value) {
    this.setState({
      amount: value
    });
    this.submit();
  }

  handleMonthsChange(value) {
    this.setState({
      months: value
    });
    this.submit();
  }

  submit() {
    let url = 'https://ftl-frontend-test.herokuapp.com/interest';
    let data = {
      amount: this.state.amount,
      numMonths: this.state.months
    };


    url = `${url}?${queryString.stringify(data)}`;

    fetch(url).then(response => {
      response.json().then(body => {
        this.setState({
          response: body
        })
      })
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    let { amount, months } = this.state
    let apiResponse = this.state.response;
    let monthlyAmount = apiResponse.monthlyPayment ? apiResponse.monthlyPayment.amount : "Please select amount and tenure";
    let interestRate = apiResponse.interestRate ? apiResponse.interestRate: "Please select amount and tenure"

    return (
      <div className="App" style={{ maxWidth: 320, margin: '0 auto' }}>
        <h1>Demo</h1>

        <Slider
          value={amount}
          min={500}
          max={5000}
          onChange={this.handleAmountChange}
        />

        <div>Amount: {amount}</div>

        <Slider
          value={months}
          min={6}
          max={24}
          onChange={this.handleMonthsChange}
        />

        <div style={{ marginBottom: 20 }}>Months: {months}</div>

        <button onClick={this.submit}>Submit</button>
        <h1> Your payment info </h1>
        <h2> Interest rate = {interestRate} </h2>
        <h2> Monthly Payment = {monthlyAmount} </h2>

        <div style={{ marginTop: 20 }}></div>
      </div>
    );
  }
}

export default App;