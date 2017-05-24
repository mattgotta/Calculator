import React from "react";
import ReactDOM from "react-dom";

var Buttons = React.createClass({
  getInitialState: function() {
    return {
            back: '',
            display: '0',
            buttons: ["CE", "C", "<x]", "/", "7", "8", "9", "*", "4", "5", "6",
                      "-", "1", "2", "3", "+", "neg", "0", ".", "="],
            soft_val: true,
            b_calc: false,
            total: 0,
            total_init: true
    };
  },
  onClickInput: function(val, i) {
    var b_calc = false;
    switch (i) {
      case 0: // "CE"
        this.setState({display: '0'});
        this.setState({soft_val: true});
        break;
      case 1: // "C"
        this.setState({display:'0'});
        this.setState({back:''});
        this.setState({soft_val: true});
        this.setState({total: 0});
        this.setState({b_calc: false});
        this.setState({total_init: true});
        break;
      case 4: // "7"
      case 5: // "8"
      case 6: // "9"
      case 8: // "4"
      case 9: // "5"
      case 10: // "6"
      case 12: // "1"
      case 13: // "2"
      case 14: // "3"
      case 17: // "0"
        if (!this.state.soft_val)
          this.setState({display: this.state.display.concat(val)});
        else {
          this.setState({display: val});
          this.setState({soft_val: false});
        }
        break;
      case 18: // "."
        if(this.state.display.indexOf('.') < 0)
          this.setState({display: this.state.display.concat(val)});
        break;
      case 3: // "/"
        b_calc = this.onOperation(val);
        this.setState({calc: this.onDivide});
        break;
      case 7: // "*"
        b_calc = this.onOperation(val);
        this.setState({calc: this.onMultiply});
        break;
      case 11: // "-"
        b_calc = this.onOperation(val);
        this.setState({calc: this.onSubtract});
        break;
      case 15: // "+"
        b_calc = this.onOperation(val);
        this.setState({calc: this.onAdd});
        break;
      case 19: // "="
        if (this.state.b_calc) {
          if (this.state.total_init) {
            this.setState({total: this.state.display});
          }
          let result = this.state.calc();
          this.setState({total: result});
          this.setState({display: String(result)});
          this.setState({soft_val: true});
          this.setState({back:''});
          this.setState({b_calc: false});
        }
        break;
      case 2: // "<x]"
        this.setState({display: this.state.display.slice(0, this.state.display.length - 1)});
        if (String(Math.abs(this.state.display)).length == 1)
          this.setState({display:'0'});
        break;
      case 16: // "neg"
        let inverse = Number(this.state.display) * -1;
        this.setState({display: String(inverse)});
        break;
    }
    if (this.state.b_calc & b_calc) {
      let result = this.state.calc();
      this.setState({total: result});
      this.setState({display: result});
      this.setState({soft_val: true});
    }
  },
  onDivide: function() {
    return Number(this.state.total) / Number(this.state.display);
  },
  onAdd: function() {
    return Number(this.state.total) + Number(this.state.display);
  },
  onSubtract: function() {
    return Number(this.state.total) - Number(this.state.display);
  },
  onMultiply: function() {
    return Number(this.state.total) * Number(this.state.display);
  },
  onOperation: function(val) {
    this.setState({back: this.state.back.concat(this.state.display.concat(val))});
    this.setState({soft_val: true});
    this.setState({b_calc: true});
    if (this.state.total_init) {
      this.setState({total: this.state.display});
    }
    return true;
  },
  render: function() {
    let buttons = this.state.buttons.map((icon,i) => {
      let buffer = [];
      if (!(i % 4))
         buffer.push(<br/>);
      buffer.push(<button type="button" onClick={this.onClickInput.bind(null, icon, i)}>{icon}</button>);
      return buffer;
    });
    return (
      <div>
        <p>{this.state.back}</p><br/>
        <h1>{this.state.display}</h1>
        {buttons}
      </div>
    )
  }
})

ReactDOM.render(<Buttons/>, document.getElementById('container'));
