const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Chat = require("../models/Chat");
const getAllContacts = async (req, res) => {
  try {
    const contacts = await User.find();
    const token = req.header("Authorization").split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = decoded.user;

    const userContacts = contacts.filter(
      (contact) => contact.email !== user.email
    );

    res.json({ contacts: userContacts });
  } catch (err) {
    res.json({ message: err });
  }
};
const getMessages = async (req, res) => {
  try {
    const { sender, receiver } = req.query;

    const messages = await Chat.find({
      $or: [
        { sender: sender, receiver: receiver },
        { sender: receiver, receiver: sender },
      ],
    });
    res.json({ messages });
  } catch (err) {
    res.json({ message: err });
  }
};
const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;
    const newMessage = new Chat({ sender, receiver, message });
    await newMessage.save();
    res.json({ message: "Message sent" });
  } catch (err) {
    res.json({ message: err });
  }
};
module.exports = { getAllContacts, getMessages, sendMessage };
