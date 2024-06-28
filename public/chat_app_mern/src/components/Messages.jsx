import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../utils/axiosInstance";

const Messages = (props) => {
  //   const [messages, setMessages] = useState([]);
  //   useEffect(() => {
  //     handleMessages();
  //   }, [props.receiver]);

  const chatContainer = useRef();
  useEffect(() => {
    console.log("Messages updated");
    chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
  }, [props.messages]);

  return (
    <div
      ref={chatContainer}
      className="  messages-container container  h-[70vh] overflow-y-scroll border-white rounded border-[1px] "
    >
      {props.messages.map((message, index) => (
        <div
          key={index}
          className={`${
            message.sender === localStorage.getItem("id")
              ? "flex justify-end"
              : "flex justify-start"
          }`}
        >
          <div
            className={`${
              message.sender === localStorage.getItem("id")
                ? "bg-gray-800 text-white"
                : "bg-gray-200"
            } p-2 m-2 rounded`}
          >
            {message.message}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
