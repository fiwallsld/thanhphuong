import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../../store/useContext";
import alertify from "alertifyjs";
import FormAddRoom from "./FormAddRoom";

import "./rooms.css";

function Rooms() {
  const { user, userAxios } = useUser();
  const [rooms, setRooms] = useState(null);

  const [room, setRoom] = useState(null);

  const [isShowFormUpdate, setIsShowFormUpdate] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await userAxios.get("/rooms");
        // console.log(res.data.rooms);
        setRooms(res.data.rooms);
      } catch (err) {
        alertify.set("notifier", "position", "top-center");
        alertify.error(`Something went wrong!`);
      }
    };
    getData();
  }, [user, isShowFormUpdate]);

  const deleteRoomHandle = async (id) => {
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      console.log(id);
      try {
        const res = await userAxios.delete(`/rooms/${id}`);
        // console.log(res.data.rooms);
        setRooms(res.data.rooms);
        alertify.set("notifier", "position", "top-center");
        alertify.warning("Delete successfully");
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
          <div className="d-flex justify-content-between">
            <h5 className="text-secondary">Rooms List</h5>
            <div>
              <Link to="/add-room">
                <button className="addBtn">Add New</button>
              </Link>
            </div>
          </div>
          {!rooms ? (
            <p>Loading data...</p>
          ) : (
            rooms && (
              <table className="p-2">
                <thead>
                  <tr className="tr-head">
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Max People</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr className="">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>{room._id}</td>
                      <td>{room.title}</td>
                      <td>
                        {room.desc.substring(0, 30)}
                        {room.desc.length > 35 ? "..." : ""}
                      </td>
                      <td>{room.price}</td>
                      <td>{room.maxPeople}</td>
                      <td>
                        <button
                          className="me-2"
                          style={{ color: "green", borderColor: "green" }}
                          onClick={() => {
                            setIsShowFormUpdate(true);
                            setRoom(room);
                          }}
                        >
                          Edit
                        </button>

                        <button onClick={() => deleteRoomHandle(room._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}
        </section>
      )}
      {isShowFormUpdate && (
        <FormAddRoom
          isUpdate={true}
          room={room}
          onClick={() => setIsShowFormUpdate(false)}
        />
      )}
    </>
  );
}

export default Rooms;
