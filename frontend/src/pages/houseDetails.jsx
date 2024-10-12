import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/style.css";

const HouseDetails = () => {
  const { index } = useParams(); // We will use this as the house ID
  const [house, setHouse] = useState(null); // State to hold the house details
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [mainImage, setMainImage] = useState(""); // State for the main image

  // Fetch house details from the backend
  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/houses/${index}`
        );
        const houseData = response.data;
        setHouse(houseData); // Set the house details
        if (houseData.images && houseData.images.exterior.length > 0) {
          setMainImage(houseData.images.exterior[0]); // Set the first exterior image as the main image
        }
        setLoading(false); // Turn off loading
      } catch (err) {
        setError("Failed to fetch house details.");
        setLoading(false); // Turn off loading in case of error
      }
    };

    fetchHouseDetails();
  }, [index]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!house) {
    return <p>House not found</p>;
  }

  return (
    <main className="col-sm-12 col-md-12 col-lg-12 col-xl-12 main p-5">
      <div className="row">
        {/* Left Column - Main Image */}
        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
          <div className="sticky-img">
            {/* Main Image */}
            <img
              id="house-img"
              src={mainImage}
              className="img-fluid mt-3 border border-dark rounded"
              alt={house.name}
            />
            {/* Thumbnail Images */}
            <div className="thumbnail-row col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4 d-flex justify-content-center">
              <div className="row">
                {house.images &&
                  house.images.exterior.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Exterior ${index + 1}`}
                      className="thumbnail-img m-2"
                      style={{
                        width: "120px",
                        height: "80px",
                        borderRadius: "12%",
                        cursor: "pointer",
                      }}
                      onClick={() => setMainImage(image)} // Set clicked image as the main image
                    />
                  ))}
              </div>
            </div>
            {/* Buttons */}
            <div className="mt-4 text-center">
              <button className="btn btn-lg btn-outline-light me-5">
                <Link
                  to={`/architecturePlan/${house._id}`}
                  className="text-reset text-decoration-none"
                >
                  Architecture Plan
                </Link>
              </button>
              <button className="btn btn-lg btn-outline-light">
                <Link
                  to={`/interior/${house._id}`}
                  className="text-reset text-decoration-none"
                >
                  Interior Option
                </Link>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - House Details */}
        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
          <p className="mb-4 fs-1 fw-semibold border-bottom" id="house-name">
            {house.name}
          </p>
          <div className="d-flex border-bottom p-2 my-4">
            <p className="col-5 mb-4 house-details fw-light fs-4">
              Description:
            </p>
            <p className="mb-4 house-details fw-light fs-4" id="house-desp">
              {house.desp}
            </p>
          </div>
          <div className="d-flex border-bottom p-2 my-4">
            <p className="col-5 mb-4 house-details fw-light fs-4">Price:</p>
            <p className="mb-4 house-details fw-light fs-4" id="house-price">
            ₹ {house.price} lakhs
            </p>
          </div>
          <div className="d-flex border-bottom p-2 my-4">
            <p className="col-5 mb-4 house-details fw-light fs-4">
              Area Required:
            </p>
            <p className="mb-4 house-details fw-light fs-4" id="house-area">
              {house.area} sq ft
            </p>
          </div>
          <div className="d-flex border-bottom p-2 my-4">
            <p className="col-5 mb-4 house-details fw-light fs-4">
              Material Required:
            </p>
            <p className="mb-4 house-details fw-light fs-4" id="house-material">
              {house.material}
            </p>
          </div>
          <div className="d-flex border-bottom p-2 my-4">
            <p className="col-5 mb-4 house-details fw-light fs-4">
              Land Options:
            </p>
            <p
              className="mb-4 house-details fw-light fs-4"
              id="house-landOptions"
            >
              {house.landOptions}
            </p>
          </div>
          <div className="d-flex border-bottom p-2 my-4">
            <p className="col-5 mb-4 house-details fw-light fs-4">
              Contractor/Architect:
            </p>
            <p
              className="mb-4 house-details fw-light fs-4 me-2"
              id="house-contractor-name"
            >
              {house.contractor.name}
            </p>
            <p
              className="mb-4 house-details fw-light fs-4"
              id="house-contractor-contact"
            >
              {house.contractor.contact}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HouseDetails;
