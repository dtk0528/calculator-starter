import React from 'react';

import CalcButton from './CalcButton';
// 計算機 App
class CalcApp extends React.Component {
  static showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  static calculateResult(pN, op, dN) {
    let result;

    if (op === '+') {
      result = Number(pN) + Number(dN);
    } else if (op === '-') {
      result = Number(pN) - Number(dN);
    } else if (op === 'x') {
      result = Number(pN) * Number(dN);
    } else if (op === '÷') {
      result = Number(pN) / Number(dN);
    }

    return String(result);
  }

  constructor(props) {
    super(props);
    this.state = {
      displayNumber: '',
      pendingNumber: '0',
      pendingOperator: '+',
      equalIsClick: false,
      updateNumber: true,
    };
  }

  resetState() {
    this.setState({
      displayNumber: '',
      pendingNumber: '0',
      pendingOperator: '+',
      equalIsClick: false,
      updateNumber: true,
    });
  }

  handleNumberClick(num) {
    let disNum;

    if (this.state.updateNumber) {
      disNum = num;
    } else {
      disNum = this.state.displayNumber + num;
    }

    this.setState({
      displayNumber: disNum,
      updateNumber: false,
    });
  }

  handleOperatorClick(op) {
    let disNum = this.state.displayNumber;
    let penNum = this.state.pendingNumber;
    let penOpe = this.state.pendingOperator;
    let eqCli = this.state.equalIsClick;
    let result = this.calculateResult(penNum, penOpe, disNum);

    if (op === '=') {
      result = (disNum === '') ? this.calculateResult(penNum, penOpe, penNum) : result;
      if (!eqCli && disNum !== '') penNum = disNum;
      disNum = result;
      eqCli = true;
    } else if (op === '.') {
      if (disNum === '') disNum = '0';
      if (disNum.indexOf('.') === -1) disNum += '.';
    } else if (op === 'pNs') {
      if (disNum !== 0 && disNum !== '') {
        disNum = (Number(disNum) >= 0) ? (`-${disNum}`) : disNum.substr(1);
      }
    } else {
      penNum = eqCli ? disNum : result;
      disNum = '';
      penOpe = op;
      eqCli = false;
    }
    this.setState({
      displayNumber: disNum,
      pendingNumber: penNum,
      pendingOperator: penOpe,
      equalIsClick: eqCli,
      updateNumber: true,
    });
  }

  render() {
    const display = (this.state.displayNumber !== '') ? this.state.displayNumber : this.state.pendingNumber;
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{display}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState.bind(this)}>AC</CalcButton>
            <CalcButton onClick={this.handleOperatorClick.bind(this, 'pNs')}>+/-</CalcButton>
            <CalcButton onClick={this.showNotImplemented.bind(this)}>%</CalcButton>
            <CalcButton
              className="calc-operator"
              onClick={this.handleOperatorClick.bind(this, '÷')}
            >÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton
              className="calc-number"
              onClick={this.handleNumberClick.bind(this, '7')}
            >7</CalcButton>
            <CalcButton
              className="calc-number"
              onClick={this.handleNumberClick.bind(this, '8')}
            >8</CalcButton>
            <CalcButton
              className="calc-number"
              onClick={this.handleNumberClick.bind(this, '9')}
            >9</CalcButton>
            <CalcButton
              className="calc-operator"
              onClick={this.handleOperatorClick.bind(this, 'x')}
            >x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton
              className="calc-number"
              onClick={this.handleNumberClick.bind(this, '4')}
            >4</CalcButton>
            <CalcButton
              className="calc-number"
              onClick={this.handleNumberClick.bind(this, '5')}
            >5</CalcButton>
            <CalcButton
              className="calc-number"
              onClick={this.handleNumberClick.bind(this, '6')}
            >6</CalcButton>
            <CalcButton
              className="calc-operator"
              onClick={this.handleOperatorClick.bind(this, '-')}
            >-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton
              className="calc-number"
              onClick={this.handleNumberClick.bind(this, '1')}
            >1</CalcButton>
            <CalcButton
              className="calc-number"
              onClick={this.handleNumberClick.bind(this, '2')}
            >2</CalcButton>
            <CalcButton
              className="calc-number"
              onClick={this.handleNumberClick.bind(this, '3')}
            >3</CalcButton>
            <CalcButton
              className="calc-operator"
              onClick={this.handleOperatorClick.bind(this, '+')}
            >+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton
              className="calc-zero"
              onClick={this.handleNumberClick.bind(this, '0')}
            >0</CalcButton>
            <CalcButton
              className="calc-number"
              onClick={this.handleOperatorClick.bind(this, '.')}
            >.</CalcButton>
            <CalcButton
              className="calc-operator"
              onClick={this.handleOperatorClick.bind(this, '=')}
            >=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
