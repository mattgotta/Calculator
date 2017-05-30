import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import App from '../client/components/App.jsx';

describe('Im just seein if the tester works', () => {
  it('still just testing the tester', () => {
    expect(true);
  })
});

describe('Test negative and repeated =', () => {
  let calculator;
  let neg;
  let minus;
  let one;
  let equals;

  beforeEach(() => {
    calculator = mount(<App />);
    neg = calculator.find({id: 'negate'});
    minus = calculator.find({id: 'minus'});
    one = calculator.find({id: '1'});
    equals = calculator.find({id: 'equals'})
  })


  it('one works', () => {
  one.simulate('click');
  const display = calculator.state().userInput;
  expect(display).toEqual(1);
});

it('neg works', () => {
    one.simulate('click');
    neg.simulate('click');
    const display = calculator.state().userInput;
    expect(display).toEqual(-1);
  });
  it('minus and equals works', () => {
    one.simulate('click');
    minus.simulate('click');
    one.simulate('click');
    equals.simulate('click');
    const display = calculator.state().userInput;
    expect(display).toEqual(0);
  });

  it('ok the actual thing now', () => {
    one.simulate('click');
    minus.simulate('click');
    one.simulate('click');
    equals.simulate('click');
    equals.simulate('click');
    neg.simulate('click');
    equals.simulate('click');
    const display = calculator.state().userInput;
    expect(display).toEqual(0);
  });

});

describe('Back button', () => {
  let calculator;
  let back;
  let nine;

  beforeEach(() => {
    calculator = mount(<App />);
    back = calculator.find({id: 'back'})
    nine = calculator.find({id: '9'});
  });

  it('Test presence', () => {
    expect(back).toExist();
  });

  it('Click once', () => {
    nine.simulate('click');
    back.simulate('click');
    const display = calculator.state().userInput;
    expect(display).toEqual(0);
  });

  it('Click thrice', () => {
    for (let i = 0; i < 3; ++i) nine.simulate('click');
    for (let i = 0; i < 3; ++i) back.simulate('click');
    const display = calculator.state().userInput;
    expect(display).toEqual(0);
  });
});

describe('Operator buttons', () => {
  let calculator;
  let plus;
  let minus;
  let two;
  let equals;

  beforeEach(() => {
    calculator = mount(<App />);
    two = calculator.find({id: '2'});
    plus = calculator.find({id: 'add'});
    minus = calculator.find({id: 'minus'});
    equals = calculator.find({id: 'equals'});
  });

  it('Operator switch', () => {
    two.simulate('click');
    plus.simulate('click');
    minus.simulate('click');
    two.simulate('click');
    equals.simulate('click');
    const display = calculator.state().userInput;
    expect(display).toEqual(0);
  });

  it('Operator chaining', () => {
    for (let i = 0; i < 5; ++i) {
      two.simulate('click');
      plus.simulate('click');
    }
    const display = calculator.state().userInput;
    expect(display).toEqual(10);
  });
});

describe('Negate button', () => {
  let calculator;
  let two;
  let negate;

  beforeEach(() => {
    calculator = mount(<App />);
    two = calculator.find({id: '2'});
    negate = calculator.find({id: 'negate'});
  });

  it('Test presence', () => {
    expect(negate).toExist();
  });

  it('Negate zero', () => {
    negate.simulate('click');
    const display = calculator.state().userInput;
    expect(display).toEqual(0);
  });

  it('Negate nonzero number', () => {
    two.simulate('click');
    negate.simulate('click');
    const display = calculator.state().userInput;
    expect(display).toEqual(-2);
  });

});

describe('Zero button', () => {
  let calculator;
  let two;
  let zero;
  let plus;
  let clear;
  let equals;

  beforeEach(() => {
    calculator = mount(<App />);
    two = calculator.find({id: '2'});
    zero = calculator.find({id: '0'});
    plus = calculator.find({id: 'add'});
    clear = calculator.find({id: 'clear'});
    equals = calculator.find({id: 'equals'});
  });

  it('Test presence', () => {
    expect(zero).toExist();
  });

  it('Click twice', () => {
    for (let i = 0; i < 2; ++i) zero.simulate('click');
    const display = calculator.state().userInput;
    expect(display).toEqual('0');
  });

  it('Doesnt precede a number', () => {
    zero.simulate('click');
    two.simulate('click');
    const display = calculator.state().userInput;
    expect(display).toEqual('2');
  });


});

describe('Decimal button', () => {
  let calculator;
  let two;
  let plus;
  let decimal;
  let equals;

  beforeEach(() => {
    calculator = mount(<App />);
    two = calculator.find({id: '2'});
    plus = calculator.find({id: 'add'});
    decimal = calculator.find({id: 'decimal'});
    equals = calculator.find({id: 'equals'});
  });

  it('Test presence', () => {
    expect(decimal).toExist();
  });

  it('Doesnt add multiple decimals', () => {
    decimal.simulate('click');
    two.simulate('click');
    decimal.simulate('click');
    const display = calculator.state().userInput;
    expect(display).toEqual('0.2');
  });

  it('Add decimal on decimal operation result', () => {
    two.simulate('click');
    decimal.simulate('click');
    two.simulate('click');
    plus.simulate('click');
    two.simulate('click');
    plus.simulate('click');
    decimal.simulate('click');
    two.simulate('click');
    equals.simulate('click');
    const display = calculator.state().userInput;
    expect(display).toEqual(4.4);
  });
})

describe('Equals button', () => {
  let calculator;
  let equals;
  let two;
  let plus;

  beforeEach(() => {
    calculator = mount(<App />);
    equals = calculator.find({id: 'equals'})
    two = calculator.find({id: '2'});
    plus = calculator.find({id: 'add'});
    two.simulate('click');
    plus.simulate('click');
    two.simulate('click');
  });

  it('Test presence', () => {
    expect(equals).toExist();
  });

  it('Click once', () => {
    equals.simulate('click');
    const display = calculator.state().userInput;
    expect(display).toEqual(4);
  });

  it('Click thrice', () => {
    for (let i = 0; i < 3; ++i) equals.simulate('click');
    const display = calculator.state().userInput;
    expect(display).toEqual(8);
  });
});
