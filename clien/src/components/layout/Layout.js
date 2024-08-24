import { Outlet } from "react-router-dom";
import MailList from "../mailList/MailList";
import "./layout.css";

function Layout() {
  return (
    <div>
      <div className="container-fluid">
        <Outlet />
      </div>
      <MailList />
    </div>
  );
}

export default Layout;
