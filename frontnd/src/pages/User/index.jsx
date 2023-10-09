import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useStore, useSelector } from "react-redux";
import { user } from "../../app/selectors";
import { getUser, updateUser } from "../../features/user";

import bankAccounts from "../../data/bankAccounts";
import formatAmount from "../../utils/formatAmount";
import PATTERN_NAME from "../../utils/patternName";

import Loader from "../../components/Loader";
import AccountContent from "../../components/AccountContent";
import Modal from "../Modal";
import { store } from "../../../src/app/store";

function User() {
  const store = useStore();
  const { token, firstName, lastName, amount } = useSelector(user);
  console.log(amount);
  const token1 = store.getState().user.token;
  console.log(token + "h");
  console.log(token1 + "h1");
  const [openModal, setOpenModal] = useState(false);

  // useEffect(() => {});

  let [edit, setEdit] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // if we have token, get user details
    // else, navigate to home page
    token1 != null ? getUser(store, token1) : navigate("/");
  }, [store, token1, navigate]);

  // Display loader while user details is null
  if (firstName === null) {
    return (
      <main id="User">
        <Loader />
      </main>
    );
  } else {
    return (
      <main id="User">
        {edit ? (
          <div className="header">
            <h1>Welcome back</h1>
            <div className="edit-input">
              <input
                type="text"
                id="first-name"
                placeholder={firstName}
                pattern={PATTERN_NAME}
                required
              />
              <input
                type="text"
                id="last-name"
                placeholder={lastName}
                pattern={PATTERN_NAME}
                required
              />
            </div>
            <p className="errorText hide">Enter valid names</p>
            <div className="button-container">
              <button
                onClick={() => updateUser(store, token, setEdit)}
                id="saveButton">
                Save
              </button>
              <button onClick={() => setEdit(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="header">
            <h1>
              Welcome back
              <br />
              {`${firstName} ${lastName} !`}
            </h1>
            <div className="button-container">
              <button onClick={() => setEdit(true)}>Edit Name</button>
            </div>
          </div>
        )}

        <h2 className="sr-only">Accounts</h2>
        <section className="content-container">
          {/* {bankAccounts.map((account) => ( */}
          <AccountContent title="" description="Available" />
          {/* ))} */}
        </section>
      </main>
    );
  }
}

export default User;
