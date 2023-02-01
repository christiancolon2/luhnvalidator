import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './component/Header';
import Validation from './component/Validation';

const App = () => {
  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    validateCardNumber();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const validateCardNumber = () => {
    if (!input) {
      setIsValid(null);
      return;
    }

    const digits = input.split('').map(Number);
    if (digits.length !== 16) {
      setIsValid(false);
      return;
    }

    let transformedDigits = digits.map((n, i) => (i % 2 === 0 ? n * 2 : n));
    transformedDigits = transformedDigits.map((el) => (el > 9 ? el - 9 : el));

    const sum = transformedDigits.reduce((total, i) => total + i);
    setIsValid(sum % 10 === 0);
  };

  return (
    <div className="App">
      <Header />
      <Validation input={input} setInput={setInput} isValid={isValid} />
    </div>
  );
};

export default App;

