import React, { useState } from "react";
import "./_style.scss";

const Modal1 = ({ open, onClose }) => {
  const [enteredAmount, setEnteredAmount] = useState(0);
  const [mainAmount, setMainAmount] = useState(1000); // Set your initial main amount here

  const handleAmountChange = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && newValue <= 10000) {
      setEnteredAmount(newValue);
    }
  };

  const handleYesClick = () => {
    if (enteredAmount > 0) {
      setMainAmount(mainAmount - enteredAmount);
      setEnteredAmount(0); // Clear the entered amount
    }
  };

  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer">
        <img src="../../assets/bank-Tree.jpeg" alt="/" />
        <div className="modalRight">
          <p className="closeBtn" onClick={onClose}>
            X
          </p>
          <div className="content">
            <p>Send Money</p>
          </div>
          <div className="input-wrapper">
            <label htmlFor="money">Amount</label>
            <input
              type="number"
              id="money"
              max={10000}
              value={enteredAmount}
              onChange={handleAmountChange}
              required
            />
          </div>
          <div className="btnContainer">
            <button className="btnPrimary">
              <span className="bold">YES</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal1;
