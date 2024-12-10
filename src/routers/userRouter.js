const express = require("express");
const router = express.Router();

router.all("/", (req, res, next) => {
  console.log(user);
  res.json({ message: "from user router" });
});



module.exports = router;