import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

const footer = () => {
  return (
    <>
      <footer className="text-center text-lg-start">
        <section className="d-flex justify-content-center justify-content-lg-center p-4 border-bottom border-top">
          <div className="me-3 d-none d-lg-block">
            <span>Get connected with us on social networks :</span>
          </div>
          <div>
            <Link to="" className="me-4 text-reset text-decoration-none">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link to="" className="me-4 text-reset text-decoration-none">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link to="" className="me-4 text-reset text-decoration-none">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link to="" className="me-4 text-reset text-decoration-none">
              <i className="fab fa-youtube"></i>
            </Link>
          </div>
        </section>

        <section className="border-bottom">
          <div className="container text-center text-md-start pt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto px-5 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>OPEX HOME SOLUTIONS
                </h6>
                <p>
                  "The Opex Home Solutions provides various home designs along
                  with architecture planning and interior options to plan and
                  build your dream house..."
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-3 ps-5 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">SERVICES</h6>
                <p>
                  <Link
                    to="/"
                    className="text-reset text-decoration-none"
                    onClick={() => {
                      window.scroll(0, 0);
                    }}
                  >
                    Home Designs
                  </Link>
                </p>
                <p>
                  <Link
                    to="/"
                    className="text-reset text-decoration-none"
                    onClick={() => {
                      window.scroll(0, 0);
                    }}
                  >
                    Interior Designs
                  </Link>
                </p>
                <p>
                  <Link
                    to="/"
                    className="text-reset text-decoration-none"
                    onClick={() => {
                      window.scroll(0, 0);
                    }}
                  >
                    Home Plans
                  </Link>
                </p>
                <p>
                  <Link
                    to="/"
                    className="text-reset text-decoration-none"
                    onClick={() => {
                      window.scroll(0, 0);
                    }}
                  >
                    Home Architecture
                  </Link>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">QUICK LINKS</h6>
                <p>
                  <Link
                    to="/about"
                    className="text-reset text-decoration-none"
                    onClick={() => {
                      window.scroll(0, 0);
                    }}
                  >
                    About us
                  </Link>
                </p>
                <p>
                  <Link
                    to="/contact"
                    className="text-reset text-decoration-none"
                    onClick={() => {
                      window.scroll(0, 0);
                    }}
                  >
                    Contact Us
                  </Link>
                </p>
                <p>
                  <Link
                    to=""
                    className="text-reset text-decoration-none"
                    onClick={() => {
                      window.scroll(0, 0);
                    }}
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-home me-1"></i> Pune Maharashtra
                </p>
                <p>
                  <i className="fas fa-envelope me-1"></i>{" "}
                  contact@opexhomesolutions.com
                </p>
                <p>
                  <i className="fas fa-phone me-1"></i> +01 234 567 88
                </p>
                <p>
                  <i className="fas fa-print me-1"></i> +01 234 567 89
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center pb-3 pt-3">
          © 2024 Copyright:
          <Link className="text-reset text-decoration-none fw-bold" to="">
            opexhomesolutions.com
          </Link>
        </section>
      </footer>
    </>
  );
};

export default footer;
