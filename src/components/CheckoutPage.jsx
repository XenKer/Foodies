import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");

    navigate("/payment");
  };

  const mapRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          displayMap(userLocation);
        },
        (error) => {
          console.log("Error getting user's location:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    const { name, email, address } = formData;
    const isValid =
      name.trim() !== "" && email.trim() !== "" && address.trim() !== "";
    setIsFormValid(isValid);
  }, [formData]);

  const displayMap = (userLocation) => {
    const mapOptions = {
      center: userLocation,
      zoom: 12,
    };

    const map = new window.google.maps.Map(mapRef.current, mapOptions);

    new window.google.maps.Marker({
      position: userLocation,
      map,
      title: "Your Location",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="container mx-auto mt-4 max-w-4xl">
      <h2 className="text-2xl font-semibold mb-2">Checkout</h2>
      <div className="mb-4">
        <nav className="flex mb-2"></nav>
      </div>
      <div ref={mapRef} style={{ height: "200px" }}></div>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border p-2 w-full"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border p-2 w-full"
            value={formData.email}
            onChange={handleInputChange}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block font-medium mb-1">
            Address:
          </label>
          <textarea
            id="address"
            name="address"
            className="border p-2 w-full"
            rows="3"
            value={formData.address}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className={`${
            isFormValid
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-500 cursor-not-allowed"
          } text-white py-2 px-4 rounded transition-colors duration-300`}
          disabled={!isFormValid}
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
