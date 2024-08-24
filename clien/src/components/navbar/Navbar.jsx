import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../store/userContext";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";

const Navbar = () => {
  const { user, setUser, userAxios } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userAuto = JSON.parse(localStorage.getItem("user"));
    if (userAuto) {
      const autoLogin = async () => {
        try {
          const res = await userAxios.post(`auth?mode=login`, {
            data: userAuto,
          });
          setUser(res.data.user);
        } catch (err) {
          console.log("user not found");
          localStorage.removeItem("user");
        }
      };
      autoLogin();
    }
  }, []);

  const handleLogout = async () => {
    try {
      const res = await userAxios.get(`/logout`);
      setUser("");
      localStorage.removeItem("user");
      navigate("/");
    } catch (err) {
      console.log(err.response);
    }
  };

  // Function to check if a path is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar">
      <div className="navContainer">
        <div className="navLinks">
          <div className={`navLink ${isActive("/home") ? "active" : ""}`}>
            <FontAwesomeIcon icon={faHome} />
            <Link to="/home">TRANG CHỦ</Link>
          </div>
          <div className={`navLink ${isActive("/reportDay") ? "active" : ""}`}>
            <Link to="/reportDay">BÁO BAN NỘI VỤ</Link>
          </div>
          <div className={`navLink ${isActive("/reportPolitic") ? "active" : ""}`}>
            <Link to="/reportPolitic">BÁO BAN CHÍNH TRỊ</Link>
          </div>
          <div className={`navLink ${isActive("/reportEdu") ? "active" : ""}`}>
            <Link to="/reportEdu">BÁO BAN GD-ĐT</Link>
          </div>
          <div className={`navLink ${isActive("/resignGuard") ? "active" : ""}`}>
            <Link to="/resignGuard">ĐĂNG KÝ CANH PHÒNG</Link>
          </div>
        </div>

        <div className="navLinks">
          {!user && (
            <>
              <div className={`navLink ${isActive("/auth?mode=sign-up") ? "active" : ""}`}>
                <Link to="/auth?mode=sign-up">ĐĂNG KÝ</Link>
              </div>
              <div className={`navLink ${isActive("/auth?mode=login") ? "active" : ""}`}>
                <Link to="/auth?mode=login">ĐĂNG NHẬP</Link>
              </div>
            </>
          )}
          {user && (
            <>
              <button className="navLink">
                <Link to={`/transaction?API=${user.username}`}>
                  Tài khoản <span>{user.email}</span>
                </Link>
              </button>
              <button className="navLink" onClick={handleLogout}>
                Đăng xuất
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
