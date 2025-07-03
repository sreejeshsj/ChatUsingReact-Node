import socket from "../socket";
import { useEffect, useState } from "react";
function Chat() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const username = prompt("Enter your name");

    socket.on("connect", () => {
      console.log("socket id:", socket.id);
    });
    socket.emit("join", username);
    socket.on("userJoined", (user) => {});

    socket.on("addMessage", (msg) => {
      console.log(msg);
      setMessage((prev) => [...prev, msg]);
    });

    socket.on("disconnect", () => {
      console.log("disconneted", socket.id);
    });
  }, []);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      socket.emit("sendMessage", input);
      setInput("")
    }
    
  };

  return (
    <div className="chat-container">
      <h1>CHAT BOX</h1>
      <div className="chat-box">
        {message.length > 0 ? (
          message.map((msg, index) =>
            (
              <div key={index}>
                <p>
                  <strong>{msg.username}:</strong> {msg.msg}
                </p>
              </div>
            )
          )
        ) : (
          <p>loading</p>
        )}
      </div>
      <div className="message">
        <form
          action=""
          className="d-flex"
          onSubmit={(e) => handleSubmitMessage(e)}
        >
          <input
            type="text"
            name="message"
            className="form-control"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
