import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../store/userContext";
import Navbar from "../navbar/Navbar";

const Header = ({ type }) => {
  const { user } = useUser();
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } });
  };

  return (
    <div className="header">
      <div className="headerContainer">
        <div className="header-body">
          <div id="header-logo-container">
          </div>
          <div id="header-text-container" className="text-center">
            <h2 className="text-2xl text-purple-800">
              QUÂN ĐOÀN 3
            </h2>
            <h1 className="text-red-500 text-4xl font-bold mt-1">
              TRƯỜNG QUÂN SỰ
            </h1>
            <h3 className="text-yellow-300 text-lg font-semibold tracking-wider">
              TỰ LỰC - TỰ CƯỜNG - DŨNG CẢM - SÁNG TẠO - ĐOÀN KẾT - KỶ LUẬT - DẠY TỐT - HỌC TỐT
            </h3>
          </div>
        </div>
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
