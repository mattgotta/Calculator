/*
    ./client/components/App.jsx
*/
import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "0",
      firstInput: "",
      addition: false,
      subtraction: false,
      division: false,
      multiplication: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
    this.handleSubtract = this.handleSubtract.bind(this);
    this.handleSqrt = this.handleSqrt.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleDivision = this.handleDivision.bind(this);
    this.handleMultiplication = this.handleMultiplication.bind(this);
    this.handlePower = this.handlePower.bind(this);
    this.handleInversion = this.handleInversion.bind(this);
    this.handleClearEntry = this.handleClearEntry.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleNeg = this.handleNeg.bind(this);
  }

  setAllFalse () {
    this.setState({
      addition: false,
      subtraction: false,
      division: false,
      multiplication: false
    });
  }
  switchInputs () {
    this.setState({
      firstInput: this.state.userInput,
      userInput: "0"
  });
}
  clearAllInput () {
    this.setState({
      firstInput: "",
      userInput: "0"
    });
  }

  handleUserInput(e) {
    let input = e.target.value;
    if (!isNaN(input)) {
      if (input == "") {
        this.setState({userInput: "0"})
      }
      else {
        let numInput = String(parseFloat(input));
        this.setState({
          userInput: numInput
        });
      }
    }
  }

  handleClick (e) {
    if (e.target.value != "." && this.state.userInput == "0"){
      this.setState({
        userInput: e.target.value
      })
    }
    else {
      this.setState({
        userInput: this.state.userInput + e.target.value
      });
    }
  }

  handleAdd () {
    if (this.state.multiplication || this.state.division ||
       this.state.addition || this.state.subtraction) {
         if (parseFloat(this.state.userInput) == 0) {
           this.setAllFalse();
           this.setState({addition: true})
         }
         else {
           var a = this.handleEquals();
           this.setState({
             addition: true,
             userInput: "0",
             firstInput: a
           })
         }
    }
    else {
      this.setAllFalse();
      this.switchInputs();
      this.setState({
        addition: true,
      });
    }
  }

  handleSubtract () {
    if (this.state.multiplication || this.state.division ||
       this.state.addition || this.state.subtraction) {
         if (parseFloat(this.state.userInput) == 0) {
           this.setAllFalse();
           this.setState({subtraction: true})
         }
         else {
           var a = this.handleEquals();
           this.setState({
             subtraction: true,
             userInput: "0",
             firstInput: a
           })
         }
    }
    else {
      this.setAllFalse();
      this.setState({
        firstInput: this.state.userInput,
        userInput: "",
        subtraction: true
      });
    }
  }

  handleSqrt () {
    let first = parseFloat(this.state.userInput);
    this.setAllFalse();
    this.clearAllInput();
    this.setState({
      userInput: Math.sqrt(first)
    });
  }
  handlePower () {
    let first = parseFloat(this.state.userInput);
    this.setAllFalse();
    this.switchInputs();
    this.setState({
      userInput: Math.pow(first,2)
    });
  }
  handleInversion() {
    let first = parseFloat(this.state.userInput);
    this.setAllFalse();
    this.switchInputs();
    this.setState({
      userInput: 1/first
    });
  }

  handleClear () {
    this.setAllFalse();
    this.clearAllInput();
  }
  handleDivision () {
    if (this.state.multiplication || this.state.division ||
       this.state.addition || this.state.subtraction) {
         if (parseFloat(this.state.userInput) == 0) {
           this.setAllFalse();
           this.setState({division: true})
         }
         else {
           var a = this.handleEquals();
           this.setState({
             division: true,
             userInput: "0",
             firstInput: a
           })
         }
    }
    else {
      this.setAllFalse();
      this.switchInputs();
      this.setState({
        division: true
      });
    }
    }
  handleMultiplication () {
    if (this.state.multiplication || this.state.division ||
       this.state.addition || this.state.subtraction) {
         if (parseFloat(this.state.userInput) == 0) {
           this.setAllFalse();
           this.setState({multiplication: true})
         }
         else {
           var a = this.handleEquals();
           this.setState({
             multiplication: true,
             userInput: "0",
             firstInput: a
           })
         }
    }
    else {
      this.setAllFalse();
      this.switchInputs();
      this.setState({
        multiplication: true
      });
    }
    }
  handleClearEntry () {
    this.setState({
      userInput: "0"
    })
  }
  handleBack() {
    this.setState({
      userInput: this.state.userInput.slice(0, -1)
    });
    this.checkEmptyString();
  }
  checkEmptyString() {
    if (this.state.userInput.length == 1){ //String(Math.abs(parseFloat(this.state.userInput))).length==1 how it was
      this.setState({
        userInput: "0"
      });
    }
  }
  handleNeg() {
    var number = parseFloat(this.state.userInput)
    number = -number;
    this.setState({
      userInput: number.toString()
    })
  }
  handleEquals () {
    if (this.state.addition == true){
      let first = parseFloat(this.state.firstInput);
      let second = parseFloat(this.state.userInput);
      var secretOutput = first + second;
      this.setState({
        userInput: String(secretOutput)
      });
      return secretOutput;
    }
    else if (this.state.subtraction == true) {
      let first = parseFloat(this.state.firstInput);
      let second = parseFloat(this.state.userInput);
      var secretOutput = first - second;
      this.setState({
        userInput: String(secretOutput)
      });
      return secretOutput;
    }
    else if (this.state.division == true) {
      let first = parseFloat(this.state.firstInput);
      let second = parseFloat(this.state.userInput);
      var secretOutput = first / second;
      this.setState({
        userInput: String(secretOutput)
      });
      return secretOutput;
    }
    else if (this.state.multiplication == true) {
      let first = parseFloat(this.state.firstInput);
      let second = parseFloat(this.state.userInput);
      var secretOutput = first * second;
      this.setState({
        userInput: String(secretOutput)
      });
      return secretOutput;
    }
  }

  render() {
    return (
     <div style={{textAlign: 'center'}} className="calc">
       <h3 className="title">Crapulator</h3>
       <h2 className="back">{this.state.firstInput}</h2>
       <input
          value={this.state.userInput}
          type="text"
          className="input"
          onChange={this.handleUserInput} /><br/>
        <button id='sqrt' onClick={this.handleSqrt} className="buttonsTop">sqrt</button>
        <button id='^2' onClick={this.handlePower} className="buttonsTop">^2</button>
        <button id='1/x' onClick={this.handleInversion} className="buttonsTop">1/x</button><br/>
        <button id='CE' onClick={this.handleClearEntry} className="buttons">CE</button>
        <button id='clear' onClick={this.handleClear} className="buttons">C</button>
        <button id='back' onClick={this.handleBack} className="buttons">Back</button>
        <button id='divide' onClick={this.handleDivision} className="buttons">/</button><br/>
        <button id='7' onClick={this.handleClick} value="7" className="buttons">7</button>
        <button id='8' onClick={this.handleClick} value="8" className="buttons">8</button>
        <button id='9' onClick={this.handleClick} value="9" className="buttons">9</button>
        <button id='multiply' onClick={this.handleMultiplication} className="buttons">*</button> <br/>
        <button id='4' onClick={this.handleClick} value="4" className="buttons">4</button>
        <button id='5' onClick={this.handleClick} value="5" className="buttons">5</button>
        <button id='6' onClick={this.handleClick} value="6" className="buttons">6</button>
        <button id='minus' onClick={this.handleSubtract} className="buttons">-</button><br/>
        <button id='1' onClick={this.handleClick} value="1" className="buttons">1</button>
        <button id='2' onClick={this.handleClick} value="2" className="buttons">2</button>
        <button id='3' onClick={this.handleClick} value="3" className="buttons">3</button>
        <button id='add' onClick={this.handleAdd} className="buttons">+</button><br/>
        <button id='negate' onClick={this.handleNeg} className="buttons">neg</button>
        <button id='0' onClick={this.handleClick} value="0" className="buttons">0</button>
        <button id='decimal' onClick={this.handleClick} value="." className="buttons">.</button>
        <button id='equals' onClick={this.handleEquals} className="buttons">=</button>
      </div>);
  }
}
