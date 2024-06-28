import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Contact from "../components/Contact";
import Messages from "../components/Messages";
import { io } from "socket.io-client";
const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentContact, setCurrentContact] = useState("");
  const [receivedMessage, setReceivedMessage] = useState(null);
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        transports: ["websocket"],
      }),
    []
  );
  socket.on("receive message", (data) => {
    if (data.receiver === localStorage.getItem("id")) {
      setReceivedMessage(data);
    }
  });
  socket.on("connect", () => {
    console.log("Connected to server");
  });

  const handleMessages = async () => {
    try {
      const response = await axiosInstance.get(
        `http://localhost:3000/api/chat/messages?sender=${localStorage.getItem(
          "id"
        )}&receiver=${receiver}`
      );
      setMessages(response.data.messages);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectContact = async (id) => {
    setReceiver(id);
  };
  useEffect(() => {
    if (receiver !== null) {
      handleMessages();
    }
  }, [receiver]);

  const handleGetContacts = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:3000/api/chat/contacts"
      );

      setContacts(response.data.contacts);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSend = async () => {
    if (!message || !receiver) {
      console.log("Please fill all the fields");
      return;
    }
    try {
      const response = await axiosInstance.post(
        "http://localhost:3000/api/chat/send",
        {
          sender: localStorage.getItem("id"),
          receiver,
          message,
        },

        socket.emit("send message", {
          sender: localStorage.getItem("id"),
          receiver,
          message,
        })
      );
      handleMessages();

      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (receivedMessage) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);
  useEffect(() => {
    handleGetContacts();
  }, []);
  return (
    <>
      <nav>
        <div className="flex justify-between items-center bg-gray-800 p-4">
          <div className="text-white font-bold font-custom">Snappy</div>
          <div>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className=" hover:bg-gray-900 text-white rounded-md px-4 py-2"
            >
              Logout
              <span className=" font-bold m-2">
                {localStorage.getItem("username").toUpperCase()}
              </span>
            </button>
          </div>
        </div>
      </nav>
      <div className="flex h-screen bg-gray-900">
        <div className="w-4/12 m-5 rounded-xl bg-gray-700 overflow-scroll">
          <div className="p-4">
            <h2 className="text-white text-center text-lg font-custom font-bold mb-4">
              Contacts
            </h2>
            <ul>
              {!contacts ? (
                <h4>No users to show</h4>
              ) : (
                contacts.map((contact, i) => (
                  <li
                    onClick={() => {
                      handleSelectContact(contact._id),
                        setCurrentContact(contact.username);
                    }}
                    key={i}
                    className="text-white p-2"
                  >
                    <Contact receiver={receiver} contact={contact}></Contact>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="w-8/12 m-5 rounded-xl bg-gray-700">
          <div className="text-white text-lg text-center  font-custom font-bold m-2">
            {currentContact
              ? `Chatting with ${currentContact}`
              : "Select a contact"}
          </div>
          <div className="m-4 relative min-h-[70vh] border-[1px] border-white rounded overflow-scroll">
            {messages && (
              <Messages messages={messages} receiver={receiver}></Messages>
            )}
          </div>
          <div className=" flex flex-row justify-center items-center">
            <input
              type="text"
              value={message}
              className="w-10/12 p-2 m-2 rounded-md border-[1px] border-white"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></input>
            <button
              onClick={handleSend}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
