import { useEffect, useState } from "react";
import { useUser } from "../../store/useContext";
import formatDate from "../../components/hook/useFormatDate";
import alertify from "alertifyjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import "../table.css";

function Transactions() {
  const { user, userAxios } = useUser();
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await userAxios.get("/transactions");
        // console.log(res.data.transactions);
        setTransactions(res.data.transactions);
      } catch (err) {
        alertify.set("notifier", "position", "top-center");
        alertify.error(`Something went wrong!`);
      }
    };
    getData();
  }, [user]);

  return (
    <section className="mt-3 container-table">
      <div className="">
        <h5 className="text-secondary">Transactions List</h5>
      </div>

      {!transactions ? (
        <p>Loading data...</p>
      ) : (
        transactions && (
          <table className="p-2">
            <thead>
              <tr className="tr-head">
                <th>
                  <input type="checkbox" />
                </th>
                <th>ID</th>
                <th>User</th>
                <th>Hotel</th>
                <th>Rooms</th>
                <th>Date</th>
                <th>Price</th>
                <th>Payment Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tran) => (
                <tr key={tran._id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{tran._id}</td>
                  <td>{tran.user}</td>
                  <td>{tran.hotel.name}</td>
                  <td>
                    {tran.room.map((num, index) => {
                      if (index === tran.room.length - 1) return `${num}`;
                      else return `${num}, `;
                    })}
                  </td>
                  <td>
                    {formatDate(tran.dateStart)} - {formatDate(tran.dateEnd)}
                  </td>
                  <td>{tran.price}</td>
                  <td>{tran.payment}</td>
                  <td>
                    <span className={`td--status ${tran.status.toLowerCase()}`}>
                      {tran.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="">
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="d-flex flex-row-reverse w-100">
                  <span className="">
                    1-{transactions.length} of {transactions.length}
                    {"  "}
                    <button>
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    {"  "}
                    <button>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        )
      )}
    </section>
  );
}

export default Transactions;
