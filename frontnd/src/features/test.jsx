// import { getQRCode } from "./qrcode";
const { getQRCode } = require("./qrcode");
const c = getQRCode();
console.log(c);
const { signUp } = require("./user");
const qrcodeData = await signUp(e, store, navigate);
console.log(qrcodeData);
