import React, { useState } from "react";
import useMessages from "./useMessages";
import "../styles/chats.css";
import { uploadFile } from "./Uploadfiles";
import { auth } from "../firebaseconfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ChatSection = ({ recipientId, setRecipientId, currentUser, users }) => {
  const navigate = useNavigate();

  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const { messages, sendMessage, currentUserName, messagesEndRef } =
    useMessages(recipientId, currentUser);

  const selectedMember = users.find((user) => user.userId === recipientId);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const handleSendfile = async (e) => {
    if (selectedFile) {
      try {
        const fileName = `${Date.now()}_${selectedFile.name}}`;
        const filePath = `chat_files/${fileName}`;

        const fileURL = await uploadFile(selectedFile, filePath);
        await sendMessage(fileURL);
        setSelectedFile(null);
      } catch (error) {
        console.error(`Error sending file`, error);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
      alert("Logged out successfully");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="chat-section">
      <div className="messages-box">
        <h3 className="sender-name">{selectedMember?.name}</h3>
        {messages
          .filter(
            (message) =>
              (message.senderId === currentUser?.uid &&
                message.recipientId === recipientId) ||
              (message.senderId === recipientId &&
                message.recipientId === currentUser?.uid)
          )
          .map((message) => (
            <div
              key={message.id}
              className={`chat-bubble ${
                message.senderId === currentUser?.uid ? "me" : "other"
              }`}
            >
              {message.text && !message.text.startsWith("http") ? (
                <span> {message.text}</span>
              ) : message.text && message.text.startsWith("http") ? (
                <a
                  href={message.text}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="file-link"
                >
                  View file
                </a>
              ) : null}
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="chat-input-box"
        />
        <div
          onClick={() =>
            (document.getElementById("attachments").style.display = "block")
          }
        >
          📎
        </div>
        <input
          id="attachments"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <button
          className="chat-send-box"
          onClick={() => {
            sendMessage(newMessage);
            setNewMessage("");
            handleSendfile();
          }}
        >
          Send
        </button>

        <button className="sign-out-button" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default ChatSection;
