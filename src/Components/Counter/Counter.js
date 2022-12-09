import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../../Actions/Counter/CounterActions.js';
import { withRouter } from 'react-router';
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';

class Counter extends React.Component {

  increment = () => {
    this.props.increment();
  }

  decrement = () => {
    this.props.decrement();
  }

  render() {
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}>-</button>
          <span>{this.props.count}</span>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    count: state.CounterReducer.count
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ increment, decrement }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Counter));