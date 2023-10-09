const User = require("../database/models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
module.exports.createUser = async (serviceData) => {
  try {
    const user = await User.findOne({ email: serviceData.email });
    if (user) {
      throw new Error("Email already exists");
    }

    const hashPassword = await bcrypt.hash(serviceData.password, 12);
    var secret = speakeasy.generateSecret({
      name: `Argent Bank: ${serviceData.email}`,
    });
    const newUser = new User({
      email: serviceData.email,
      password: hashPassword,
      firstName: serviceData.firstName,
      lastName: serviceData.lastName,
      ascii: secret.ascii,
    });

    let result = await newUser.save();
    async function generateQRCode() {
      try {
        const dataURL = await generateQRCodeDataURL(secret.otpauth_url);
        console.log(dataURL);
        return dataURL;
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    }
    var URLs = generateQRCode();
    function generateQRCodeDataURL(otpauthUrl) {
      return new Promise((resolve, reject) => {
        qrcode.toDataURL(otpauthUrl, (err, dataURL) => {
          if (err) {
            reject(err);
          } else {
            resolve(dataURL);
          }
        });
      });
    }
    return URLs;
  } catch (error) {
    console.error("Error in userService.js", error);
    throw new Error(error);
  }
};

module.exports.getUserProfile = async (serviceData) => {
  try {
    const jwtToken = serviceData.headers.authorization
      .split("Bearer")[1]
      .trim();
    const decodedJwtToken = jwt.decode(jwtToken);
    const user = await User.findOne({ _id: decodedJwtToken.id });

    if (!user) {
      throw new Error("User not found!");
    }
    console.log(user);
    return user.toObject();
  } catch (error) {
    console.error("Error in userService.js", error);
    throw new Error(error);
  }
};

module.exports.loginUser = async (serviceData) => {
  try {
    const user = await User.findOne({ email: serviceData.email });
    const ascii = user.ascii;
    if (!user) {
      throw new Error("User not found!");
    }

    const isValid = await bcrypt.compare(serviceData.password, user.password);
    console.log(ascii);
    var verified = speakeasy.totp.verify({
      secret: ascii,
      encoding: "ascii",
      token: serviceData.token,
    });
    console.log(verified);
    if (!isValid || !verified) {
      throw new Error("Password is invalid or 2factor code is wrong");
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY || "default-secret-key",
      { expiresIn: "1d" }
    );

    return { token };
  } catch (error) {
    console.error("Error in userService.js", error);
    throw new Error(error);
  }
};

module.exports.updateUserProfile = async (serviceData) => {
  try {
    const jwtToken = serviceData.headers.authorization
      .split("Bearer")[1]
      .trim();
    const decodedJwtToken = jwt.decode(jwtToken);
    const user = await User.findOneAndUpdate(
      { _id: decodedJwtToken.id },
      {
        firstName: serviceData.body.firstName,
        lastName: serviceData.body.lastName,
      },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found!");
    }

    return user.toObject();
  } catch (error) {
    console.error("Error in userService.js", error);
    throw new Error(error);
  }
};
