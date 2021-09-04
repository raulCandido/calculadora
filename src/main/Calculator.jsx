import React, { Component } from 'react';
import Button from '../components/Button';
import Display from '../components/Display';

import './Calculator.css';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  state = { ...initialState };

  clearMemory() {
    this.setState({ ...initialState });
  }
  addDigito(n) {
    if (n === '.' && this.state.displayValue.includes('.')) {
      return;
    }
    const clearDisplay =
      this.state.displayValue === '0' || this.state.clearDisplay;
    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({ displayValue, clearDisplay: false });

    if (n !== '.') {
      const indice = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[indice] = newValue;
      this.setState({ values });
    }
  }
  setOperation(op) {
    if (this.state.current === 0) {
      this.setState({ op, current: 1, clearDisplay: true });
    } else {
      const equals = op === '=';
      const currentOperation = this.state.operation;
      const values = [...this.state.values];
      values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      values[1] = 0;
    }

    this.setState({
        //displayValue: values[0],
    })
  }

  render() {
    const addDigito = (n) => this.addDigito(n);
    const setOperation = (op) => this.setOperation(op);

    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={() => this.clearMemory()} triple />
        <Button label="/" click={setOperation} operation />
        <Button label="9" click={addDigito} />
        <Button label="8" click={addDigito} />
        <Button label="7" click={addDigito} />
        <Button label="*" click={setOperation} operation />
        <Button label="6" click={addDigito} />
        <Button label="5" click={addDigito} />
        <Button label="4" click={addDigito} />
        <Button label="-" click={setOperation} operation />
        <Button label="3" click={addDigito} />
        <Button label="2" click={addDigito} />
        <Button label="1" click={addDigito} />
        <Button label="+" click={setOperation} operation />
        <Button label="0" click={addDigito} double />
        <Button label="." click={setOperation} operation />
        <Button label="=" click={setOperation} operation />
      </div>
    );
  }
}
