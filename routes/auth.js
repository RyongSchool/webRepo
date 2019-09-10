const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { User } = require("../models/Users");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = authenticateUser(req.body);
  console.log(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validpassword = await bcrypt.compare(req.body.password, user.password);

  if (!validpassword) return res.status(400).send("Invalid email or password");
  const token = user.generateAuthToken();

  // res.header('x-auth-token',token).send(_.pick(user,['name','email']));
  res.send({ token: token });
});

// information expert principle
function authenticateUser(userData) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(userData, schema);
}
module.exports = router;
