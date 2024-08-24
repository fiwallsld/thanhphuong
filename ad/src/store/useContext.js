import { createContext, useContext, useState } from "react";
import axios from "axios";
const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const userAxios = axios.create({
    // baseURL: "http://localhost:5000/admin",
    baseURL: "https://booking-website-server.onrender.com/admin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${user?.username}`,
    },
  });

  return (
    <UserContext.Provider value={{ user, setUser, userAxios }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

export function useUser() {
  return useContext(UserContext);
}
