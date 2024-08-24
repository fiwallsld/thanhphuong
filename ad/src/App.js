import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import "./App.css";
import InfoBoard from "./pages/InfoBoard/InfoBoard";
import Hotels from "./pages/Hotels/Hotels";
import FormAddHotel from "./pages/Hotels/FormAddHotel";
import Rooms from "./pages/Rooms/Rooms";
import FormAddRoom from "./pages/Rooms/FormAddRoom";
import Transactions from "./pages/Transactions/Transactions";
import UserProvider from "./store/useContext";
import Users from "./pages/Users/Users";
import ErrorEl from "./pages/error/ErrorEl";
function App() {
  return (
    <UserProvider>
      <BrowserRouter className="container">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" index={true} element={<InfoBoard />} />
            <Route path="/users" index={true} element={<Users />} />
            <Route path="/hotels" index={true} element={<Hotels />} />
            <Route path="/add-hotel" index={true} element={<FormAddHotel />} />
            <Route path="/rooms" index={true} element={<Rooms />} />
            <Route path="/add-room" index={true} element={<FormAddRoom />} />
            <Route
              path="/transactions"
              index={true}
              element={<Transactions />}
            />
            <Route path="*" element={<ErrorEl />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
