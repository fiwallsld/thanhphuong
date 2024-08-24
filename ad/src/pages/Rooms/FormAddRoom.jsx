import { useEffect, useState } from "react";
import { useUser } from "../../store/useContext";
import alertify from "alertifyjs";
import { useNavigate } from "react-router-dom";

import "./FormAddRoom.css";

function FormAddRoom({ isUpdate = false, room = null, onClick }) {
  const navigate = useNavigate();
  const { user, userAxios } = useUser();
  const [hotels, setHotels] = useState(null);
  const [roomInput, setRoomInput] = useState(null);

  //-----Get hotels and roomInput while update case
  useEffect(() => {
    const getData = async () => {
      try {
        const resHotels = await userAxios.get(
          `/hotels${isUpdate ? `/${room._id}` : ""}`
        );
        // console.log(resHotels.data.hotels);
        setHotels(resHotels.data.hotels);
      } catch (err) {
        alertify.set("notifier", "position", "top-center");
        alertify.error(`Something went wrong!`);
      }
    };
    getData();

    console.log("room:----", room);
    setRoomInput({ ...room });
  }, [user]);

  //----------change value input-----------
  const handleOnchange = (e) => {
    setRoomInput((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  //----------Handle submit----------
  const submitHandle = async (e) => {
    e.preventDefault();

    //----------Add new room case ----------
    if (!isUpdate) {
      console.log(roomInput);
      try {
        const res = await userAxios.post("/rooms", {
          data: roomInput,
        });
        // console.log("Hotels:----", res);
        alertify.set("notifier", "position", "top-center");
        alertify.success("Add room successfully!");

        navigate("/rooms");
      } catch (error) {
        alertify.set("notifier", "position", "top-center");
        alertify.error("Add room failed! Check again your input");
      }
    }

    //----------Update room case ----------

    if (isUpdate) {
      try {
        const res = await userAxios.post(`/rooms/${room._id}`, {
          data: roomInput,
        });
        // console.log("Hotels:----", res);
        alertify.set("notifier", "position", "top-center");
        alertify.success("Update room successfully!");
        onClick();
        navigate("/rooms");
      } catch (error) {
        alertify.set("notifier", "position", "top-center");
        alertify.error("Add room failed! Check again your input");
      }
    }
  };

  return (
    <section>
      <h5 className="text-secondary">
        {isUpdate ? "Update Room" : "Add New Room"}
      </h5>
      <form className="form-container" onSubmit={submitHandle}>
        <div className="row">
          <div className="col">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Room Title"
              onChange={(e) => handleOnchange(e)}
              value={roomInput?.title}
              required
            />

            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              placeholder="100"
              onChange={(e) => handleOnchange(e)}
              value={roomInput?.price}
              required
            />
          </div>
          <div className="col-1"></div>

          <div className="col">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="desc"
              placeholder="Description"
              onChange={(e) => handleOnchange(e)}
              value={roomInput?.desc}
              required
            />

            <label htmlFor="maxPeople">Max People</label>
            <input
              type="number"
              name="maxPeople"
              placeholder="5"
              onChange={(e) => handleOnchange(e)}
              value={roomInput?.maxPeople}
              required
            />
          </div>
        </div>

        <div className="row ">
          <div className="col">
            <label>Rooms</label>
            <textarea
              type="text"
              name="roomNumbers"
              placeholder="Give comfortable to you"
              className="w-100"
              rows="4"
              onChange={(e) => handleOnchange(e)}
              value={roomInput?.roomNumbers}
              required
            />
          </div>

          <div className="col">
            <label htmlFor="hotel'">Choose a hotel</label>
            <select
              name="hotel"
              value={roomInput?.hotel}
              onChange={(e) => handleOnchange(e)}
              required
            >
              {hotels &&
                hotels.map((hotel) => (
                  <option key={hotel._id} value={hotel.name}>
                    {hotel.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="col">
            <button type="submit" className="me-3">
              {isUpdate ? "Update" : "Send"}
            </button>
            {isUpdate && (
              <button type="button" onClick={onClick}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}

export default FormAddRoom;
