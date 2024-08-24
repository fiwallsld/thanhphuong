import { useEffect, useState } from "react";
import { useUser } from "../../store/useContext";
import alertify from "alertifyjs";
import FormUpdateAccount from "../../components/LoginForm/UpdateAccount";

import "./Users.css";

function Users() {
  const { user, userAxios } = useUser();
  const [accounts, setAccounts] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isShowFormUpdate, setIsShowFormUpdate] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await userAxios.get("/users");
        // console.log(res.data.users);
        setAccounts(res.data.users);
      } catch (err) {
        alertify.set("notifier", "position", "top-center");
        alertify.error(`Something went wrong!`);
      }
    };
    getData();
  }, [user, isShowFormUpdate]);

  const deleteUserHandle = async (id) => {
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      console.log(id);
      try {
        const res = await userAxios.delete(`users/${id}`);

        setAccounts(res.data.users);
        alertify.set("notifier", "position", "top-center");
        alertify.warning(res.data.mes);
      } catch (err) {
        alertify.set("notifier", "position", "top-center");
        alertify.error(`Delete failed! ${err.response.data.mes}`);
      }
    }
  };

  return (
    <>
      {!isShowFormUpdate && (
        <section className="mt-3 container-table">
          <h5 className="text-secondary">Users List</h5>

          <table className="p-2">
            <thead>
              <tr className="tr-head">
                <th>
                  <input type="checkbox" />
                </th>
                <th>ID</th>
                <th>Full name</th>
                <th>User name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {accounts &&
                accounts.map((acc) => (
                  <tr className="">
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{acc._id}</td>
                    <td>{acc.fullName}</td>
                    <td>{acc.username}</td>
                    <td>{acc.email}</td>
                    <td>{acc.phoneNumber}</td>
                    <td>
                      <button
                        className="me-2 addBtn"
                        onClick={() => {
                          setUserId(acc._id);
                          setIsShowFormUpdate(true);
                        }}
                      >
                        Reset Pass
                      </button>
                      <button onClick={() => deleteUserHandle(acc._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      )}
      {isShowFormUpdate && (
        <FormUpdateAccount userId={userId} onClick={setIsShowFormUpdate} />
      )}
    </>
  );
}

export default Users;
