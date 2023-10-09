const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const tokenValidation = require("../middleware/tokenValidation");
const User = require("../database/models/userModel");
const jwt = require("jsonwebtoken");
router.post("/signup", userController.createUser);

router.post("/login", userController.loginUser);

router.post(
  "/profile",
  tokenValidation.validateToken,
  userController.getUserProfile
);

router.put(
  "/profile",
  tokenValidation.validateToken,
  userController.updateUserProfile
);

router.put("/transaction", async (req, res) => {
  try {
    const jwtToken = req.headers.authorization.split("Bearer")[1].trim();
    // console.log(jwtToken);
    const decodedJwtToken = jwt.decode(jwtToken);
    const user1 = await User.findOne({ _id: decodedJwtToken.id });
    let amt = req.body.amount;
    console.log(amt);
    let oldamt = user1.amount;
    let newamt = 0;
    if (amt >= 0 && amt <= oldamt) newamt = oldamt - amt;
    else {
      newamt = oldamt;

      res.send("insufficient bank balance");
    }
    console.log(newamt);
    const user = await User.findOneAndUpdate(
      { _id: decodedJwtToken.id },
      {
        amount: newamt,
      },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found!");
    }
    const response = user;
    res.status(200).send(response);
  } catch (error) {
    console.error("Error in userService.js", error);
    throw new Error(error);
  }
});

module.exports = router;
