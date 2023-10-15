import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getQRCode, setQRCode } from "./qrcode";

import storage from "redux-persist/lib/storage"; // Import the storage mechanism you want to use
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import { string } from "prop-types";
import { wait } from "@testing-library/user-event/dist/utils";

const initialState = {
  token: null,
  firstName: null,
  lastName: null,
};

const { actions, reducer } = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      return;
    },
    logout: () => {
      return initialState;
    },
    update: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.amount = action.payload.amount;
      return;
    },
  },
});

export const { login, logout, update } = actions;
export default reducer;

const BASE_URL_API = "https://website-link-here/api/v1/";

/**
 * Create new user in the ddb
 * @param { object} e Event informations
 * @param { object } store Redux store
 * @param { Function } navigate 'navigate' of useNavigate() from react-router-dom
 * @returns { ( store | Error) } If 'Connect me' is checked, user is login, else navigate to sign-in page
 */
export async function signUp(e, store, navigate) {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;
  const firstName = capitalizeFirstLetter(e.target[2].value);
  const lastName = capitalizeFirstLetter(e.target[3].value);
  const connect = e.target[4].checked;
  const submitButton = document.getElementsByClassName("sign-up-button")[0];
  const errorText = document.getElementsByClassName("errorText")[0];

  // Reset animation
  submitButton.style.animation = "";
  try {
    const response = await axios.post(`${BASE_URL_API}user/signup`, {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
    console.log(response);
    const qrcode = response.data.body;
    setQRCode(qrcode);
    console.log(getQRCode());
    const qrCodeData = await getQRCode();
    // downloadTextFile(qrCodeData, "qrcode.txt");
    localStorage.setItem("qrcode", qrCodeData);
    return qrcode;
  } catch (error) {}
}

/**
 * Logs the user into the application
 * @param { object} e Event informations
 * @param { object } store Redux store
 * @returns { ( store | Error) } Store token in redux, if 'Remember me' is checked, email is store in the local storage
 */
// function downloadTextFile(data, filename) {
//   const blob = new Blob([data], { type: "text/plain" });
//   const url = window.URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.style.display = "none";
//   a.href = url;
//   a.download = filename;
//   document.body.appendChild(a);
//   a.click();
//   window.URL.revokeObjectURL(url);
// }
export function Login(e, store) {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;
  const token = e.target[3].value;
  const remember = e.target[2].checked;

  const submitButton = document.getElementsByClassName("sign-in-button")[0];
  const errorText = document.getElementsByClassName("errorText")[0];

  // Reset animation
  submitButton.style.animation = "";

  // Store field values when 'Remember me' is checked
  if (remember) {
    localStorage.setItem("userEmail", email); // Store the email if "Remember me" is checked
    localStorage.setItem("userPassword", password); // Store the email if "Remember me" is checked
  } else {
    delete localStorage.username;
    delete localStorage.remember;
  }

  axios
    .post(`${BASE_URL_API}user/login`, {
      email: email,
      password: password,
      token: token,
    })
    .then((response) => {
      localStorage.setItem("isLogged", true);
      // Add Bearer for API
      // const cookieHeaders = response.headers["set-cookie"];
      // const ckh = response.headers["Set-Cookie"];
      // console.log(cookieHeaders);
      // const jwtCookie = cookieHeaders
      //   .split(";")
      //   .find((cookie) => cookie.startsWith("jwt="))
      //   .split("=")[1];
      // console.log(jwtCookie);

      const token = `Bearer ${response.data.body.token}`;
      store.dispatch(login(token));
    })
    .catch(() => {
      submitButton.classList.add("errorButton");
      submitButton.style.animation =
        "shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both";
      errorText.classList.remove("hide");
    });
}

/**
 * Get user details
 * @param { object } store Redux store
 * @param { string } token Bearer token
 * @returns { ( store | Error) } Store user details in redux
 */
export function getUser(store, token) {
  axios
    .post(
      `${BASE_URL_API}user/profile`,
      {},
      {
        headers: { authorization: token },
      }
    )
    .then((response) => {
      const body = response.data.body;
      console.log(token);
      console.log(body);
      const payload = {
        firstName: body.firstName,
        lastName: body.lastName,
        amount: body.amount,
      };
      store.dispatch(update(payload));
    })
    .catch((error) => {
      console.log("Error with getUser =>", error);
    });
}
/**
 * Update user details in ddb
 * @param { object } store Redux store
 * @param { string } token Bearer token
 * @param { Function } setEdit set 'edit' state from useState
 * @returns { ( store | Error) } Store new user details in redux
 */
export function updateUser(store, token, setEdit) {
  const first = document.getElementById("first-name");
  const last = document.getElementById("last-name");
  const saveButton = document.getElementById("saveButton");
  const errorText = document.getElementsByClassName("errorText")[0];

  const isValid = first.checkValidity() && last.checkValidity();

  const firstName = capitalizeFirstLetter(first.value);
  const lastName = capitalizeFirstLetter(last.value);

  if (isValid) {
    axios
      .put(
        `${BASE_URL_API}user/profile`,
        {
          firstName: firstName,
          lastName: lastName,
        },
        {
          headers: { authorization: token },
        }
      )
      .then((response) => {
        const body = response.data.body;
        const payload = {
          firstName: body.firstName,
          lastName: body.lastName,
          amount: body.amount,
        };
        store.dispatch(update(payload));
        setEdit(false);
      })
      .catch((error) => {
        console.log("Error with updateUser =>", error);
      });
  } else {
    saveButton.classList.add("errorButton");
    saveButton.style.animation =
      "shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both";
    errorText.classList.remove("hide");
  }
}

/**
 * Update user details in ddb
 * @param { object } store Redux store
 * @param { string } token Bearer token
 * @returns { ( store | Error) } Store new user details in redux
 */

export function getAmount(store, amountToSend, token) {
  axios
    .put(
      `${BASE_URL_API}user/transaction`,
      {
        amount: amountToSend,
      },
      {
        headers: { authorization: token },
      }
    )
    .then((response) => {
      const body = response.data;
      console.log(body);
      const payload = {
        firstName: body.firstName,
        lastName: body.lastName,
        amount: body.amount,
      };
      store.dispatch(update(payload));
    })
    .catch((error) => {
      console.log("Error with getUser =>", error);
    });
}
