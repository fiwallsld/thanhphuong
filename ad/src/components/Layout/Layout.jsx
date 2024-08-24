import React, { useContext, useEffect } from "react";

import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableCellsLarge,
  faUser,
  faBed,
  faHouseUser,
  faCarSide,
  faArrowRightFromBracket,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../store/useContext";
import FormLogin from "../LoginForm/LoginForm";

import "./layout.css";

function Layout() {
  const { user, setUser, userAxios } = useUser();

  useEffect(() => {
    const userAuto = JSON.parse(localStorage.getItem("adminUser"));
    if (userAuto) {
      const autoLogin = async () => {
        try {
          const res = await userAxios.post(`auth?mode=login`, {
            data: userAuto,
          });

          setUser(res.data.user);
        } catch (err) {
          console.log("user not found");
          localStorage.removeItem("adminUser");
        }
      };

      autoLogin();
    }
  }, []);

  const logoutHandle = async () => {
    try {
      const res = await userAxios.get(`/logout`);
      setUser(null);
      localStorage.removeItem("adminUser");
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <main className="container-fluid">
      <header className="py-2 row">
        <h2 className="col-3 title cl-icon ">HTTT TC23</h2>
      </header>

      <div className="row py-2">
        <div className="sidebar">
          <div className="sidebar-group mb-2">
            <h5>MAIN</h5>
            <Link to="/">
              <FontAwesomeIcon
                icon={faTableCellsLarge}
                className="me-2 cl-icon "
              />
              TỔNG HỢP
            </Link>
          </div>

          <div className="sidebar-group mb-2">
            <h5>CÁC VỊ TRÍ</h5>
            <Link to="users">
              <FontAwesomeIcon icon={faUser} className="me-2 cl-icon " />
              CHTM/QĐ3 - XÃ GÀO
            </Link>
            <Link to="hotels">
              <FontAwesomeIcon icon={faHouseUser} className="me-2 cl-icon " />
              BẮN ĐẠN THẬT/QĐ3 - TB2
            </Link>
            <Link to="rooms">
              <FontAwesomeIcon icon={faBed} className="me-2 cl-icon " />
              CHTM/F320 - HÒA PHÚ
            </Link>
            <Link to="transactions">
              <FontAwesomeIcon icon={faCarSide} className="me-2 cl-icon " />
              VƯỢT SÔNG/F320 - BIỂN HỒ
            </Link>
          </div>
          <div className="sidebar-group mb-2">
            <h5>TỔNG HỢP</h5>
            <Link to="/add-hotel">
              <FontAwesomeIcon icon={faHouseUser} className="me-2 cl-icon " />
              TRUYỀN DẪN
            </Link>
            <Link to="/add-room">
              <FontAwesomeIcon icon={faBed} className="me-2 cl-icon " />
              TRUYỀN HÌNH
            </Link>
            <Link to="/add-room">
              <FontAwesomeIcon icon={faBed} className="me-2 cl-icon " />
              TRUYỀN SỐ LIỆU
            </Link>
            <Link to="/add-room">
              <FontAwesomeIcon icon={faBed} className="me-2 cl-icon " />
              TỔNG ĐÀI
            </Link>
            <Link to="/add-room">
              <FontAwesomeIcon icon={faBed} className="me-2 cl-icon " />
              TRUNKING
            </Link>
          </div>
          <div className="sidebar-group mb-2">
            <h5>USERS</h5>
            {user ? (
              <Link to="#" onClick={logoutHandle}>
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className="me-2 cl-icon "
                />
                Logout
              </Link>
            ) : (
              <Link to="?mode=login">
                <FontAwesomeIcon
                  icon={faArrowRightToBracket}
                  className="me-2 cl-icon "
                />
                Login
              </Link>
            )}
          </div>
        </div>
        <div className="col">{user ? <Outlet /> : <FormLogin />}</div>
      </div>
    </main>
  );
}

export default Layout;
