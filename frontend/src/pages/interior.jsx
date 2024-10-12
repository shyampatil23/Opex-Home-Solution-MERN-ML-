import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/style.css";

const Interior = () => {
  const { index } = useParams(); // The house ID from the URL
  const [interiorImages, setInteriorImages] = useState([]); // State to store interior images
  const [mainImage, setMainImage] = useState(""); // State for the main image
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch house details (specifically interior images) from the backend
  useEffect(() => {
    const fetchInteriorImages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/houses/${index}`
        );
        const houseData = response.data;

        if (houseData.images && houseData.images.interior.length > 0) {
          setInteriorImages(houseData.images.interior); // Set the interior images
          setMainImage(houseData.images.interior[0]); // Set the first interior image as the main image
        } else {
          setError("No interior images available for this house.");
        }

        setLoading(false); // Turn off loading
      } catch (err) {
        setError("Failed to fetch interior images.");
        setLoading(false); // Turn off loading in case of error
      }
    };

    fetchInteriorImages();
  }, [index]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="col-sm-12 col-md-12 col-lg-12 col-xl-12 main p-5">
      <div className="row">
        {/* Left Column - Main Image */}
        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
          <div className="sticky-img">
            {/* Main Image */}
            <img
              id="interior-main-img"
              src={mainImage}
              className="img-fluid mt-3 border border-dark rounded"
              alt="Interior"
            />
            {/* Thumbnail Images */}
            <div className="thumbnail-row col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4 d-flex justify-content-center">
              <div className="row">
                {interiorImages.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt={`Interior ${idx + 1}`}
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

        {/* Right Column - Interior Details */}
        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
          <h2 className="mb-4 fs-1 fw-semibold border-bottom">
            Interior Options
          </h2>
          <p className="mb-4">
            Here are the available interior images for this house design:
          </p>

          {/* Buttons for Navigation */}
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
                to={`/architecturePlan/${index}`}
                className="text-reset text-decoration-none"
              >
                Plan Option
              </Link>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Interior;
