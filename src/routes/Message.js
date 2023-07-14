const express = require("express");
const Message = require("../models/message");
const auth = require("../middleware/auth");
const router = new express.Router();

// Create a new message
router.post("/api/v1/messages", auth, async (req, res) => {
  try {
    const message = new Message({
      ...req.body,
      owner: req.user._id,
    });
    await message.save();
    res.status(201).send(message);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all messages
router.get("/api/v1/messages", auth, async (req, res) => {
  try {
    const messages = await Message.find({ owner: req.user._id });
    res.send(messages);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a message by id
router.get("/api/v1/messages/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const message = await Message.findOne({ _id, owner: req.user._id });
    if (!message) return res.status(404).send();
    res.send(message);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a message by id
router.patch("/api/v1/messages/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description"];
  const isValidOperation = updates.some((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const message = await Message.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!message) {
      return res.status(404).send();
    }
    updates.forEach((update) => (message[update] = req.body[update]));
    await message.save();
    res.send(message);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a message by id
router.delete("/api/v1/messages/:id", auth, async (req, res) => {
  try {
    const message = await Message.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!message) return res.status(404).send();
    res.send(message);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
