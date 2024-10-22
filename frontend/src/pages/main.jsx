// main.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/main.css";

const Main = () => {
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    landOptions: "",
    // materials: [], // Added materials for dynamic selection
  });
  const [predictedPrice, setPredictedPrice] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleMaterialChange = (e) => {
  //   const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
  //   setFormData({ ...formData, materials: selectedOptions });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/predict-price", formData);
      setPredictedPrice(response.data.price);
    } catch (error) {
      console.error("Error predicting price:", error);
    }
  };

  const viewRelatedDesigns = (price) => {
    const searchParams = {
      name: formData.name,
      area: formData.area,
      landOptions: formData.landOptions,
      // materials: formData.materials.join(","), // Added materials to search parameters
      price,
    };
    navigate("/home", { state: searchParams });
  };

  return (
    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <div className="sections hero-sec col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <h1 className="text-center">Welcome to Opex Home Solutions</h1>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8">
              <p className="text-center hero-txt">
                A complete solution for planning and designing your dream home
              </p>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 p-4 border rounded est-box">
              <h2 className="text-center mb-4">Get a Quick Price Estimation</h2>
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-12">
                  <label className="form-label">House Design Name:</label>
                  <select
                    name="name"
                    className="form-select"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Bungalow">Bungalow</option>
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Area (in sqft):</label>
                  <select
                    name="area"
                    className="form-select"
                    value={formData.area}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="500-1000">500-1000</option>
                    <option value="1000-1500">1000-1500</option>
                    <option value="1500-2000">1500-2000</option>
                    <option value="2000-2500">2000-2500</option>
                    <option value="2500-3000">2500-3000</option>
                    <option value="3000-3500">3000-3500</option>
                    <option value="3500-4000">3500-4000</option>
                    <option value="4000-6000">4000-6000</option>
                    <option value="6000-10000">6000-10000</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Land Options:</label>
                  <select
                    name="landOptions"
                    className="form-select"
                    value={formData.landOptions}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Urban">Urban</option>
                    <option value="Suburban">Suburban</option>
                    <option value="Rural">Rural</option>
                  </select>
                </div>

                {/* <div className="col-12">
                <label className="form-label">Material Required:</label>
                <select
                  name="materials"
                  className="form-select"
                  multiple
                  value={formData.materials}
                  onChange={handleMaterialChange}
                  required
                >
                  <option value="Cement">Cement</option>
                  <option value="Concrete">Concrete</option>
                  <option value="Wood">Wood</option>
                  <option value="Glass">Glass</option>
                  <option value="Marble Tiles">Marble Tiles</option>
                </select>
              </div> */}

                <div className="col-12 mt-4 text-center">
                  <button
                    type="submit"
                    className="btn btn-lg btn-outline-warning"
                  >
                    Get Price Estimation
                  </button>
                </div>
              </form>

              {predictedPrice && (
                <div className="result mt-4 text-center">
                  <h3 className="">
                    Estimated Price: ₹{predictedPrice.toFixed(2)} lakhs
                  </h3>
                  <button
                    className="btn btn-lg btn-outline-success"
                    onClick={() => viewRelatedDesigns(predictedPrice)}
                  >
                    Explore the Designs
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Offerings Section */}
      <div className="sections col-sm-12 col-md-12 col-lg-12 col-xl-12 p-0">
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <h1 className="text-center section-txt sec-1 m-0 pt-5">
            What We Offer
          </h1>
          <div className="row g-0 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="container-content col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex sec-1">
              <div className="img-box col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-center align-items-center">
                <img
                  src="https://media-assets0.s3.ap-south-1.amazonaws.com/ext_int_plan.png"
                  alt="home design"
                />
              </div>
              <div className="content-box col-sm-6 col-md-6 col-lg-6 col-xl-6 align-self-center px-4">
                <div className="content flex-column d-flex justify-content-center align-items-center">
                  <h5>Home Designs</h5>
                  <p className="card-text">
                    Discover diverse home designs tailored to various styles and
                    budgets. Customize layouts and get detailed plans with cost
                    estimates.
                  </p>
                </div>
                <div className="btn-box d-flex justify-content-end">
                  <Link
                    to="/"
                    className="text-reset text-decoration-none"
                    target="_blank"
                  >
                    <button className="btn btn-lg btn-outline-primary blue-btn">
                      Explore Designs
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="container-content col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex sec-2">
              <div className="content-box col-sm-6 col-md-6 col-lg-6 col-xl-6 align-self-center px-4">
                <div className="content flex-column d-flex justify-content-center align-items-center">
                  <h5>Exterior Designs</h5>
                  <p className="card-text">
                    Comprehensive exterior home designs with detailed price,
                    area specifications, and estimated construction costs for
                    various styles.
                  </p>
                </div>
                <div className="btn-box d-flex justify-content-end">
                  <Link
                    to="/"
                    className="text-reset text-decoration-none"
                    target="_blank"
                  >
                    <button className="btn btn-lg btn-outline-primary blue-btn">
                      Explore Designs
                    </button>
                  </Link>
                </div>
              </div>

              <div className="img-box col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-center align-items-center">
                <img
                  src="https://thearchitectsdiary.com/wp-content/uploads/2020/05/MEtal-Facade.jpg"
                  alt="home plans"
                />
              </div>
            </div>

            <div className="container-content col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex sec-3">
              <div className="img-box col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-center align-items-center">
                <img
                  src="https://asset-ng.skoiy.com/9b80a6f781ff336f/yrwwqpnyb7ys.jpg?w=970&q=90&fm=webp"
                  alt="interior designs"
                />
              </div>

              <div className="content-box col-sm-6 col-md-6 col-lg-6 col-xl-6 align-self-center px-4">
                <div className="content flex-column d-flex justify-content-center align-items-center">
                  <h5>Interior Designs</h5>
                  <p className="card-text">
                    Personalize your spaces with customizable furniture layouts
                    and decor styles. Choose from modern, traditional, or
                    minimalist themes.
                  </p>
                </div>
                <div className="btn-box d-flex justify-content-end">
                  <Link
                    to="/"
                    className="text-reset text-decoration-none"
                    target="_blank"
                  >
                    <button className="btn btn-lg btn-outline-primary blue-btn">
                      Explore Designs
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="container-content col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex sec-4">
              <div className="content-box col-sm-6 col-md-6 col-lg-6 col-xl-6 align-self-center px-4">
                <div className="content flex-column d-flex justify-content-center align-items-center">
                  <h5>Architectural Plans</h5>
                  <p className="card-text">
                    Get access to architectural plans that align with modern
                    design principles and integrate seamlessly with existing
                    infrastructure.
                  </p>
                </div>
                <div className="btn-box d-flex justify-content-end">
                  <Link
                    to="/"
                    className="text-reset text-decoration-none"
                    target="_blank"
                  >
                    <button className="btn btn-lg btn-outline-primary blue-btn">
                      Explore Designs
                    </button>
                  </Link>
                </div>
              </div>

              <div className="img-box col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-center align-items-center">
                <img
                  src="https://house-designs-data.s3.ap-south-1.amazonaws.com/Building_10003/plan/Building_10003_pln_1.jpg"
                  alt="home architecture"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
