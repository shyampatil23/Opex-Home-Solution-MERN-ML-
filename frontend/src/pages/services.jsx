import React from "react";
import "../styles/fixed-bg.css";
import "../styles/style.css";
import { Link } from "react-router-dom";


const services = () => {
  return (
    <>
      <main className="col-sm-12 col-md-12 col-lg-12 col-xl-12 services p-5 fixed-bg">
        <h1 className="text-center mb-4">Our Services</h1>
        <div className="row g-4">
          <div className="col-md-3">
            <div className="card border border-dark">
              <Link
                to="/"
                className="text-reset text-decoration-none"
                target="_blank"
              >
                <img
                  src="https://media-assets0.s3.ap-south-1.amazonaws.com/ext_int_plan.png"
                  className="card-img-top border-bottom border-dark"
                  alt="home design"
                />
                <div className="card-body">
                  <h5>Home Designs</h5>
                  <p className="card-text">
                    Discover diverse home designs tailored to various styles and
                    budgets. Customize layouts and get detailed plans with cost
                    estimates.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border border-dark">
              <Link
                to="/architectPlan"
                className="text-reset text-decoration-none"
                target="_blank"
              >
                <img
                  src="https://thearchitectsdiary.com/wp-content/uploads/2020/05/MEtal-Facade.jpg"
                  className="card-img-top border-bottom border-dark"
                  alt="home plans"
                />
                <div className="card-body">
                  <h5>Exterior Designs</h5>
                  <p className="card-text">
                    Comprehensive exterior home designs with detailed price,
                    area specifications, and estimated construction costs for
                    various styles.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border border-dark">
              <Link
                to="/interior"
                className="text-reset text-decoration-none"
                target="_blank"
              >
                <img
                  src="https://asset-ng.skoiy.com/9b80a6f781ff336f/yrwwqpnyb7ys.jpg?w=970&q=90&fm=webp"
                  className="card-img-top border-bottom border-dark"
                  alt="./interior.js"
                />
                <div className="card-body">
                  <h5>Interior Designs</h5>
                  <p className="card-text">
                    Personalize your spaces with customizable furniture layouts
                    and decor styles. Choose from modern, traditional, or
                    minimalist themes.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border border-dark">
              <Link
                to="/architectplan"
                className="text-reset text-decoration-none"
                target="_blank"
              >
                <img
                  src="https://house-designs-data.s3.ap-south-1.amazonaws.com/Building_10003/plan/Building_10003_pln_1.jpg"
                  className="card-img-top border-bottom border-dark"
                  alt="home architecture"
                />
                <div className="card-body">
                  <h5>Home Architecture</h5>
                  <p className="card-text">
                    Explore a range of architectural styles including modern,
                    traditional, and eco-friendly designs with detailed
                    insights.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default services;
