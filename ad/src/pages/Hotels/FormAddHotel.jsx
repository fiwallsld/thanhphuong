import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/useContext";
import alertify from "alertifyjs";
import "./FormAddHotel.css";

function FormAddHotel({ isUpdate = false, hotel = null, onClick }) {
  const { user, userAxios } = useUser();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [distance, setDistance] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [rooms, setRooms] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [featured, setFeatured] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    console.log(hotel);
    if (isUpdate && hotel) {
      setName(hotel.name);
      setCity(hotel.city);
      setDistance(hotel.distance);
      setDescription(hotel.desc);
      setImageUrl(hotel.photos);
      setRooms(hotel.rooms);
      setType(hotel.type);
      setTitle(hotel.title);
      setPrice(hotel.cheapestPrice);
      setFeatured(hotel.featured);
      setAddress(hotel.address);
    }
  }, [isUpdate, hotel]);

  const submitHotelHandle = async (e) => {
    e.preventDefault();
    const data = {
      name,
      city,
      distance,
      description,
      imageUrl,
      rooms,
      type,
      title,
      price,
      featured,
      address,
    };

    if (!isUpdate) {
      try {
        const res = await userAxios.post("/hotels", {
          data: data,
        });
        // console.log("Hotels:----", res);
        alertify.set("notifier", "position", "top-center");
        alertify.success("Add hotel successfully!");

        navigate("/hotels");
      } catch (error) {
        alertify.set("notifier", "position", "top-center");
        alertify.error("Add hotel failed! Check again your input");
      }
    }

    if (isUpdate) {
      try {
        const res = await userAxios.post(`/hotels/${hotel._id}`, {
          data: data,
        });
        // console.log("Hotels:----", res);
        alertify.set("notifier", "position", "top-center");
        alertify.success("Update hotel successfully!");
        onClick();
        navigate("/hotels");
      } catch (error) {
        alertify.set("notifier", "position", "top-center");
        alertify.error("Add hotel failed! Check again your input");
      }
    }
  };

  return (
    <section>
      <h5 className="text-secondary">Add New Product</h5>
      <form className="form-container" onSubmit={submitHotelHandle}>
        <div className="row">
          <div className="col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="My hotel"
              required={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              placeholder="New York"
              required={true}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <label htmlFor="distance">Distance from City Center</label>
            <input
              type="text"
              name="distance"
              placeholder="500"
              required={true}
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            />

            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              required={true}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label htmlFor="imageUrl">Images</label>
            <input
              type="textbox"
              name="imageUrl"
              required={true}
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div className="col-1"></div>
          <div className="col">
            <label htmlFor="type">Type</label>
            <input
              type="text"
              name="type"
              placeholder="Type"
              required={true}
              value={type}
              onChange={(e) => setType(e.target.value)}
            />

            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Tran Hung Dao st, 16"
              required={true}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="The best hotel"
              required={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              placeholder="100"
              required={true}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <label htmlFor="featured'">Featured</label>
            <select
              name="featured"
              required={true}
              value={featured}
              onChange={(e) => setFeatured(e.target.value)}
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
        </div>

        <div className="col ">
          <label htmlFor="rooms">Rooms</label>
          <textarea
            type="text"
            name="rooms"
            placeholder="My hotel"
            className="w-100"
            rows="4"
            required={true}
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
          />
        </div>
        <button type="submit" className="me-2">
          {isUpdate ? "Update" : "Send"}
        </button>
        {isUpdate && (
          <button type="button" onClick={onClick}>
            Cancel
          </button>
        )}
      </form>
    </section>
  );
}

export default FormAddHotel;
