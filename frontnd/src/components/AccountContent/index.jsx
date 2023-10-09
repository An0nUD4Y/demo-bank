import PropTypes from "prop-types";
import Modal1 from "../../pages/Modal1";
import { useState } from "react";
import { getAmount } from "../../features/user";
import axios from "axios";
import { user } from "../../app/selectors";
import { store } from "../../app/store";
import { useSelector } from "react-redux";

function AccountContent({ title, description }) {
  // console.log(title, amount, description);
  const [openModal, setOpenModal] = useState(false);
  const [sendAmount, setSendAmount] = useState("");
  // const [currentAmount, setCurrentAmount] = useState(amount); // State to store the current amount
  const BASE_URL_API = "https://website-link-here/api/v1/";
  const { token, amount } = useSelector(user);

  const handleSendMoney = () => {
    const amountToSend = parseFloat(sendAmount);
    if (!isNaN(amountToSend) && amountToSend > 0 && amountToSend < amount) {
      getAmount(store, amountToSend, token);
      setSendAmount("");

      alert(`Sent ${amountToSend} from ${title}`);
    } else {
      alert("Please enter a valid positive amount to send.");
    }
  };

  return (
    <div className="account-content">
      <div>
        <h3 className="account-title">Argent Bank {title}</h3>
        <p className="account-amount">${amount}</p>
        <p className="account-amount-description">{description} Balance</p>
      </div>
      <div className="money">
        <label htmlFor="money"></label>
        <input
          type="number"
          id="money"
          value={sendAmount}
          onChange={(e) => setSendAmount(e.target.value)}
          placeholder="Enter Amount"
        />
        <button onClick={handleSendMoney} className="sign-up-button">
          Send Money
        </button>
      </div>
    </div>
  );
}

AccountContent.propTypes = {
  title: PropTypes.string,
  amount: PropTypes.string,
  description: PropTypes.string,
};

export default AccountContent;
