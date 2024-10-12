// main.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Imported navigate here
import "../styles/main.css";

const Main = () => {
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    landOptions: "",
  });
  const [predictedPrice, setPredictedPrice] = useState(null);

  const navigate = useNavigate(); // Initialized navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
      price,
    };

    navigate("/home", { state: searchParams });
  };

  return (
    <div className="main-container container col-sm-12 col-md-12 col-lg-12 col-xl-12 p-5">
      <header className="text-center mb-5">
        <h1 className="display-4">Welcome to Opex Home Solutions</h1>
      </header>
      <div className="container  border rounded">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <p className="title-text text-center">
              A complete solution for planning and designing your dream home
            </p>
          </div>
          <div className=" col-sm-12 col-md-12 col-lg-6 col-xl-6 p-4 border rounded">
            <h2 className="text-center mb-4">Get a Quick Price Estimation</h2>
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
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
                  <option value="Appartment">Appartment</option>
                </select>
              </div>

              <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
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

              <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
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

              <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4 text-center">
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
                <h3 className="">Estimated Price: ₹{predictedPrice} lakhs</h3>
                <button
                  className="btn btn-lg btn-outline-success"
                  onClick={() => viewRelatedDesigns(predictedPrice)}
                >
                  View Similar Designs
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 my-5">
        <h1 className="text-center mb-4">What We Offered You</h1>
        <div className="row g-0 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div className="box col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex border border-dark my-2">
            <div className="box-img ">
              <img
                src="https://media-assets0.s3.ap-south-1.amazonaws.com/ext_int_plan.png"
                className=""
                alt="home design"
              />
            </div>
            <div className="box-body d-flex flex-column justify-content-center text-center">
              <h5>Home Designs</h5>
              <p className="card-text">
                Discover diverse home designs tailored to various styles and
                budgets. Customize layouts and get detailed plans with cost
                estimates.
              </p>
              <Link
                to="/"
                className="text-reset text-decoration-none"
                target="_blank"
              >
                <button className="btn btn-md btn-primary">View Designs</button>
              </Link>
            </div>
          </div>

          <div className="box col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex border border-dark my-2">
            <div className="box-img">
              <img
                src="https://thearchitectsdiary.com/wp-content/uploads/2020/05/MEtal-Facade.jpg"
                className="card-img-top border-bottom border-dark"
                alt="home plans"
              />
            </div>
            <div className="box-body d-flex flex-column justify-content-center text-center">
              <h5>Exterior Designs</h5>
              <p className="card-text">
                Comprehensive exterior home designs with detailed price, area
                specifications, and estimated construction costs for various
                styles.
              </p>
              <Link
                to="/"
                className="text-reset text-decoration-none"
                target="_blank"
              >
                <button className="btn btn-md btn-primary">View Designs</button>
              </Link>
            </div>
          </div>

          <div className="box col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex border border-dark my-2">
            <div className="box-img">
              <img
                src="https://asset-ng.skoiy.com/9b80a6f781ff336f/yrwwqpnyb7ys.jpg?w=970&q=90&fm=webp"
                className="card-img-top border-bottom border-dark"
                alt="./interior.js"
              />
            </div>
            <div className="box-body d-flex flex-column justify-content-center text-center">
              <h5>Interior Designs</h5>
              <p className="card-text">
                Personalize your spaces with customizable furniture layouts and
                decor styles. Choose from modern, traditional, or minimalist
                themes.
              </p>
              <Link
                to="/"
                className="text-reset text-decoration-none"
                target="_blank"
              >
                <button className="btn btn-md btn-primary">View Designs</button>
              </Link>
            </div>
          </div>

          <div className="box col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex border border-dark my-2">
            <div className="box-img">
              <img
                src="https://house-designs-data.s3.ap-south-1.amazonaws.com/Building_10003/plan/Building_10003_pln_1.jpg"
                className="card-img-top border-bottom border-dark"
                alt="home architecture"
              />
            </div>
            <div className="box-body d-flex flex-column justify-content-center text-center">
              <h5>Home Architecture</h5>
              <p className="card-text">
                Explore a range of architectural styles including modern,
                traditional, and eco-friendly designs with detailed insights.
              </p>
              <Link
                to="/"
                className="text-reset text-decoration-none"
                target="_blank"
              >
                <button className="btn btn-md btn-primary">View Designs</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
