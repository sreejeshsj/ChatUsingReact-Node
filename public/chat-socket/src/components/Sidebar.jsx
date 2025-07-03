import { useState, useEffect } from "react";
import socket from "../socket";
function Sidebar() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("userList", (data) => {
      setUsers(data);
    });
  }, []);

  return (
    <div>
      <h4>Online Users</h4>
      {users.length > 0 ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}

export default Sidebar;
