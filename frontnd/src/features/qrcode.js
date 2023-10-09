// qrcode.js
let qrcodeValue = null;

export function setQRCode(qrcode) {
  qrcodeValue = qrcode;
}

export function getQRCode() {
  return qrcodeValue;
}
