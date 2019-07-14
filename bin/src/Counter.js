import React from 'react';

class MyName extends React.Component {
  state = {
    data : 0
  }

  handleIncrease = () => {
    this.setState({
      data : this.state.data + 1
    })
  };

  handleDecrease = () => {
    this.setState({
      data : this.state.data - 1
    })
  }

  render() {
    return (
      <div>
        <h1>카운터</h1>
        <div>값 : {this.state.data}</div>
        <button onClick={this.handleIncrease}>+</button>
        <button onClick={this.handleDecrease}>-</button>
      </div>
    );
  }
}

export default MyName;