import React from "react";
import "./_style.scss";
import { getQRCode } from "../../features/qrcode";
import { signUp } from "../../features/user";

const Modal = ({ open, onClose }) => {
  if (!open) return null;
  const qrCodeData = localStorage.getItem("qrcode");
  console.log(qrCodeData);
  const redirectToPage = () => {
    window.location.href = "/sign-in";
  };

  // const qrCodeData = getQRCode(); // Assuming this function retrieves QR code data

  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer">
        <img src={qrCodeData} alt="QR Code" className="image" />

        <div className="modalRight">
          <p className="closeBtn" onClick={onClose}>
            X
          </p>
          <div className="content">
            <p>Scan QR Code</p>
            <p>to validate</p>
            <p>your 2 Factor Authentication</p>
          </div>
          <div className="btnContainer">
            <button onClick={redirectToPage} className="btnPrimary">
              <span className="bold">YES</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
