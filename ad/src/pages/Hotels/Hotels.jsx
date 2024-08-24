import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../../store/useContext";
import alertify from "alertifyjs";

import "../table.css";
import FormAddHotel from "./FormAddHotel";

function Hotels() {
  const { user, userAxios } = useUser();
  const [hotels, setHotels] = useState(null);
  const [hotel, setHotel] = useState(null);

  const [isShowFormUpdate, setIsShowFormUpdate] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await userAxios.get("/hotels");
        setHotels(res.data.hotels);
      } catch (err) {
        alertify.set("notifier", "position", "top-center");
        alertify.error(`Something went wrong!`);
      }
    };
    getData();
  }, [user, isShowFormUpdate]);

  const deleteHotelHandle = async (id) => {
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      console.log(id);
      try {
        const res = await userAxios.delete(`hotels/${id}`);
        console.log(res);
        setHotels(res.data.hotels);
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
            <h5 className="text-secondary">Hotels List</h5>
            <div>
              <Link to="/add-hotel">
                <button className="addBtn">Add New</button>
              </Link>
            </div>
          </div>

          {!hotels ? (
            <p>Loading data...</p>
          ) : (
            hotels && (
              <table className="p-2">
                <thead>
                  <tr className="tr-head">
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Title</th>
                    <th>City</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {hotels.map((hotel) => (
                    <tr key={hotel._id}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>{hotel._id}</td>
                      <td>{hotel.name}</td>
                      <td>{hotel.type}</td>
                      <td>{hotel.title}</td>
                      <td>{hotel.city}</td>
                      <td>
                        <button
                          className="me-2"
                          style={{ color: "green", borderColor: "green" }}
                          onClick={() => {
                            setIsShowFormUpdate(true);
                            setHotel(hotel);
                          }}
                        >
                          Edit
                        </button>
                        <button onClick={() => deleteHotelHandle(hotel._id)}>
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
        <FormAddHotel
          isUpdate={true}
          hotel={hotel}
          onClick={() => setIsShowFormUpdate(false)}
        />
      )}
    </>
  );
}

export default Hotels;
