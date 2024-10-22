import React from "react";
import "../styles/fixed-bg.css";
import "../styles/style.css";

const about = () => {
  return (
    <>
      <main className="col-sm-12 col-md-12 col-lg-12 col-xl-12 about p-5 fixed-bg">

        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 container my-5">
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 row">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <img
                src="https://5.imimg.com/data5/VM/IS/IT/SELLER-90488659/bungalow-architecture-design-500x500-500x500.jpg"
                alt="About Image"
                className="about-image rounded"
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 text">
              <h2>About Us</h2>
              <p>
                The ”Smart Home Solutions” project aims to revolutionize the
                home design and construction process by providing a
                comprehensive, user-friendly platform that integrates design,
                customization, and execution. In today's rapidly evolving world,
                homeowners and prospective buyers are seeking more efficient and
                transparent ways to build and customize their dream homes.
              </p>
              <p>
                This project addresses these needs by offering a robust solution
                that showcases a wide range of home designs, complete with
                detailed information on interiors, pricing, materials, and
                professional contacts.
              </p>
            </div>
          </div>
        </div>

        <div className="container section">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 text">
              <h2>Our Mission</h2>
              <p>
                our mission is to revolutionize the home design and construction
                industry through innovative AI-driven solutions. We strive to
                empower homeowners by providing them with a comprehensive
                platform that seamlessly integrates personalized home design,
                accurate price predictions, and reliable contractor connections.
              </p>
              <p>
                Our goal is to simplify the process of creating dream homes,
                making it accessible, efficient, and enjoyable for everyone.
                Through cutting-edge technology and a customer-centric approach,
                we aim to set new standards in the industry, delivering
                exceptional value and satisfaction to our clients.
              </p>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <img
                src="https://img.freepik.com/free-photo/3d-house-model-with-modern-architecture_23-2151004032.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721088000&semt=ais_user"
                alt="Mission Image"
                className="about-image rounded"
              />
            </div>
          </div>
        </div>

        <div className="container section mt-5">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <img
                src="https://img.freepik.com/premium-photo/business-people-having-meeting-office_236854-36082.jpg"
                alt="Story Image"
                className="about-image rounded"
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 text">
              <h2>Our Story</h2>
              <p>
                We are final-year students at GH Raisoni University, pursuing
                Computer Engineering. Our journey began with a vision to
                transform the home design and construction industry using AI.
                Noticing a gap for comprehensive solutions, we developed "Smart
                Home Solution" with guidance from Prof. Girish Awadhwal.
              </p>
              <p>
                As our project progressed, its potential to simplify home
                building and renovation became clear. This motivated us to
                transform our project into a startup, providing a real solution.
                We are excited to help homeowners create their dream spaces and
                are dedicated to expanding our platform to make a significant
                industry impact.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default about;
