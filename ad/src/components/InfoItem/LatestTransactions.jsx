import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import formatDate from "../hook/useFormatDate";

import "./LatestTransactions.css";

function LatestTransactions({ transactions }) {
  return (
    <section className="mt-3 container-table">
      <h5 className="text-secondary">Latest Transactions</h5>

      {transactions && (
        <table className="p-2">
          <thead>
            <tr className="tr-head">
              <th>
                <input type="checkbox" />
              </th>
              <th>ID</th>
              <th>User</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tran) => (
              <tr className="">
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
                  {`${formatDate(tran.dateStart)} - ${formatDate(
                    tran.dateEnd
                  )}`}
                </td>
                <td>${tran.price}</td>
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
      )}
    </section>
  );
}

export default LatestTransactions;
