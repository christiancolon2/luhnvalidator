import React, { useState } from 'react';
import MessageFailed from './MessageFailed';
import MessageSuccess from './MessageSuccess';

const Validation = () => {
  const [input, setInput] = useState('');
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
    setFailed(false);
    setSuccess(false);
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input === '') {
      setError(true);
      return;
    }

    const validNum = input
      .toString()
      .split('')
      .map(Number)
      .map((n, i) => (i % 2 === 0 ? n * 2 : n))
      .map((el) => (el > 9 ? el - 9 : el))
      .reduce((total, i) => total + i);

    if (validNum % 10 === 0) {
      setSuccess(true);
      setFailed(false);
    } else {
      setFailed(true);
      setSuccess(false);
    }
  };

  return (
    <div className="form">
      <form className="form-div">
        {error && <p>Please Enter a number</p>}
        <input
          type="text"
          placeholder="Enter your card number"
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>
          Validate
        </button>
      </form>
      {success && <MessageSuccess />}
      {failed && <MessageFailed />}
    </div>
  );
};

export default Validation;
