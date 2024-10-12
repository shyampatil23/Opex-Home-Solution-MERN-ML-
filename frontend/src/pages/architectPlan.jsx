import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/style.css";

const ArchitecturePlan = () => {
  const { index } = useParams(); // Use house ID from params
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
        if (houseData.images && houseData.images.plan.length > 0) {
          setMainImage(houseData.images.plan[0]); // Set the first plan image as the main image
        }
        setLoading(false); // Turn off loading
      } catch (err) {
        setError("Failed to fetch architecture plan details.");
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
    return <p>Architecture plan not found</p>;
  }

  return (
    <main className="col-sm-12 col-md-12 col-lg-12 col-xl-12 main p-5">
      <div className="row">
        {/* Left Column - Main Image */}
        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
          <div className="sticky-img">
            {/* Main Image */}
            <img
              id="plan-img"
              src={mainImage}
              className="img-fluid mt-3 border border-dark rounded"
              alt={`Architecture Plan of ${house.name}`}
            />
            {/* Thumbnail Images */}
            <div className="thumbnail-row col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4 d-flex justify-content-center">
              <div className="row">
                {house.images &&
                  house.images.plan.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Plan ${index + 1}`}
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
          </div>
        </div>

        {/* Right Column - Architecture Plan Details */}
        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
          <p className="mb-4 fs-1 fw-semibold border-bottom" id="plan-name">
            Architecture Plan for {house.name}
          </p>
          <div className="d-flex border-bottom p-2 my-4">
            <p className="col-5 mb-4 house-details fw-light fs-4">
              Description:
            </p>
            <p className="mb-4 house-details fw-light fs-4" id="plan-desp">
              {house.desp}
            </p>
          </div>
          {/* Buttons */}
          <div className="mt-4 text-center">
            <button className="btn btn-lg btn-outline-light me-5">
              <Link
                to={`/houseDetails/${index}`}
                className="text-reset text-decoration-none"
              >
                Back to House Details
              </Link>
            </button>
            <button className="btn btn-lg btn-outline-light">
              <Link
                to={`/interior/${index}`}
                className="text-reset text-decoration-none"
              >
                Interior Option
              </Link>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ArchitecturePlan;
