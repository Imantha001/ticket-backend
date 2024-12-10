const express = require("express");
const router = express.Router();
const { route, post } = require("./ticketRouter");

const { insertUser, getUserByEmail } = require("../model/users/user.model");
const { hashPassword,comparePassword } = require("../helpers/bcrypt.helper");

const { json } = require("body-parser");



router.all("/", (req, res, next) => {
  // res.json({ message: "from user router" });
  next();
});



// Create new user router
router.post("/", async (req, res) => {
  const { name, company, address, phone, email, password } = req.body;
  try {

    const hashedPass = await hashPassword(password);
    const newUserObj = {
      name,
      company,
      address,
      phone,
      email,
      password: hashedPass,
    };
    const result = await insertUser(newUserObj);
    console.log(result);

    res.json({ message: "Created New User", result });
  } catch (error) {

    console.log(error);
    res.json({ statux: "error", message: error.message });
  }
});



//User sign in Router
router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;


  if (!email || !password) {
    return res.json({ status: "error", message: "Submition is not valid " });
  }
  const user = await getUserByEmail(email);
  const passFromDb = user && user._id ? user.password : null;



  if (!passFromDb)
    return res.json({ status: "error", message: "Invalid Email or Password!" });
  const result = await comparePassword(password, passFromDb);
  console.log(result);
  res.json({ status: "success", message: "Login Successfully..!" });


});



module.exports = router;