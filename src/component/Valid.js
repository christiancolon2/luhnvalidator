import React, { useState } from 'react';
import MessageSuccess from './MessageSuccess';
import MessageFailed from './MessageFailed';

function Valid() {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
    setFailed(false);
    setSuccess(false);
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input) {
      setError(true);
      return;
    }

    const cardNumber = input.toString().split('').map(Number);
    let validatedCardNumber = [];
    for (let i = 0; i < cardNumber.length; i++) {
      if (i % 2 === 0) {
        validatedCardNumber.push(cardNumber[i] * 2);
      } else {
        validatedCardNumber.push(cardNumber[i]);
      }
    }

    validatedCardNumber = validatedCardNumber.map((el) => (el > 9 ? el - 9 : el));

    const reducer = validatedCardNumber.reduce((total, i) => total + i);
    if (reducer % 10 === 0) {
      setSuccess(true);
      setFailed(false);
    } else {
      setFailed(true);
      setSuccess(false);
    }
    setInput('');
  };

  return (
    <div className="validation-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter card number"
          value={input}
          onChange={handleChange}
        />
        <button type="submit">Validate</button>
        {error && <p className="error-message">Please enter a card number</p>}
        {success && <MessageSuccess />}
        {failed && <MessageFailed />}
      </form>
    </div>
  );
}

export default Valid;
