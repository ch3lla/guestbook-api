const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");

// Creating a new user
router.post("/api/v1/user", async (req, res) => {
  const user = new User(req.body);
  const exists = await User.findOne({ email: req.body.email });
  if (exists === null) {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } else {
    res.send("User with email exists");
  }
});

// Sign in
router.post("/api/v1/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send("Invalid email or password");
  }
});

// Logout
router.post("/api/v1/user/logout", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    user.tokens = user.tokens.filter((token) => {
      return token.token !== req.body.token;
    });
    await user.save();
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a user
router.delete("/api/v1/user", auth, async (req, res) => {
  console.log("req.user: ", req.user);
  try {
    //await req.user.remove();
    const user = await User.findOne({ _id: req.user._id });
    console.log("user: ", user);
    console.log("user.remove: ", user.remove());
    await user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
