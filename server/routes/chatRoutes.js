const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getMessages,
  sendMessage,
} = require("../Controllers/chatController");
router.get("/contacts", getAllContacts);
router.get("/messages", getMessages);
router.post("/send", sendMessage);
module.exports = router;
