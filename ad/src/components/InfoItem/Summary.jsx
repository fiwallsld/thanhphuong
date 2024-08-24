import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faDollarSign, faWallet } from "@fortawesome/free-solid-svg-icons";

import "./Summary.css";

function Summary({ users = 0, orders = 0, earn }) {
  return (
    <section className="row">
      <div className="col">
        <div className="info-item">
          <p className="text-secondary">USER</p>
          <p>{users}</p>
          <p className="text-item--icon ">
            <FontAwesomeIcon icon={faUser} className="icon-person" />
          </p>
        </div>
      </div>
      <div className="col">
        <div className="info-item">
          <p className="text-secondary">ORDERS</p>
          <p>{orders}</p>
          <p className="text-item--icon ">
            <img
              // icon="fa-light fa-cart-shopping"
              src="./images/shopping-cart.png"
              alt="cart"
              className="icon-cart"
            />
          </p>
        </div>
      </div>
      <div className="col">
        <div className="info-item">
          <p className="text-secondary">EARNINGS</p>
          <p>${earn}</p>
          <p className="text-item--icon ">
            <FontAwesomeIcon icon={faDollarSign} className="icon-money" />
          </p>
        </div>
      </div>
      <div className=" col">
        <div className="info-item">
          <p className="text-secondary">BALANCE</p>
          <p>$ 100</p>
          <p className="text-item--icon ">
            <FontAwesomeIcon icon={faWallet} className="icon-wallet" />
          </p>
        </div>
      </div>
    </section>
  );
}

export default Summary;
