import React, { Component } from 'react';
import copy from 'copy-to-clipboard';
import styled from 'styled-components';
import Slider from './components/Slider';
import './App.css';

const Styles = styled.div`
  .App {
    display: flex;
    justify-content: center;
  }

  .wrapper {
    margin-top: 20vh;
    width: 50%;
  }

  h1 {
    margin-bottom: 0.5rem;
  }

  button {
    padding: 0;
    border: 0;

    &:focus {
      outline: none;
    }

    input {
      background-color: #${props => props.color};
      display: flex;
      text-align: center;
      color: white;
      border: 0;
      outline: 0;
      padding: 0.5rem 0 0.5rem 0;
      font-size: 1.2em;
      user-select: none;
      cursor: pointer;

      &:focus {
        outline: none;
      }
    }
  }
`;

class App extends Component {

  state = {
    color: '000000',
    showCopyText: false,
  }

  handleUpdateColor = (color, value) => {
    const red = this.state.color.slice(0, 2).toUpperCase();
    const green = this.state.color.slice(2, 4).toUpperCase();
    const blue = this.state.color.slice(4, 6).toUpperCase();
    const hexColor = Number(value).toString(16).padStart(2, '0').toUpperCase();

    if (color === 'red') {
      this.setState({ color: `${hexColor}${green}${blue}` });
    } else if (color === 'green') {
      this.setState({ color: `${red}${hexColor}${blue}` });
    } else {
      this.setState({ color: `${red}${green}${hexColor}` });
    }
  }

  toggleShowCopyText = () => {
    this.setState(
      { showCopyText: true },
      () => setTimeout(() => this.setState({ showCopyText: false }), 1000)
    )
  }

  handleCopyToClipboard = () => {
    copy('#' + this.state.color);
    this.toggleShowCopyText();
  }

  render() {
    return (
      <Styles color={this.state.color}>
        <div className="App">
          <div className="wrapper">
            <h1>Color Picker</h1>
            <button onClick={this.handleCopyToClipboard}>
              <input
                type="text"
                value={this.state.showCopyText ? 'Copied!' : `#${this.state.color}`}
                disabled="disabled"
              />
            </button>
            <Slider color="#FF4136" hexColor="red" handleUpdateColor={this.handleUpdateColor} />
            <Slider color="#3D9970" hexColor="green" handleUpdateColor={this.handleUpdateColor} />
            <Slider color="#0074D9" hexColor="blue" handleUpdateColor={this.handleUpdateColor} />
          </div>
        </div>
      </Styles>
    );
  }
}

export default App;
