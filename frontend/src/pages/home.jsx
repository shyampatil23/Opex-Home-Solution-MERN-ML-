import React, { useState, useEffect } from "react";
import "../styles/style.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [design, setDesign] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [viewMoreCount, setViewMoreCount] = useState({});
  const [showCategory, setShowCategory] = useState(null); 

  useEffect(() => {
    fetch("/api/houses")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setHouses(data);
          setFilteredHouses(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const filterHouses = () => {
    const filtered = houses.filter((house) => {
      const housePrice = house.price || null;
      const houseArea = house.area || null;

      const [minPrice, maxPrice] = price
        ? price.split("-").map((p) => parseInt(p))
        : [null, null];
      const [minArea, maxArea] = area
        ? area.split("-").map((a) => parseInt(a))
        : [null, null];

      return (
        (!design || house.name === design) &&
        (!price || (housePrice >= minPrice && housePrice <= maxPrice)) &&
        (!area || (houseArea >= minArea && houseArea <= maxArea))
      );
    });

    setFilteredHouses(filtered);
    setShowCategory(design || null);
  };

  const handleSearch = () => {
    fetch("http://localhost:5000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: searchQuery }), 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); 
      })
      .then((data) => {
        setFilteredHouses(data);
        setShowCategory(data.length > 0 ? data[0].name : null); 
      })
      .catch((error) => console.error("Search error:", error));
  };

  const handleViewMore = (category) => {
    setViewMoreCount((prev) => ({
      ...prev,
      [category]: (prev[category] || 3) + 3,
    }));
  };

  const renderHouseListByCategory = (category) => {
    if (showCategory && category !== showCategory) return null;

    const filteredByCategory = filteredHouses.filter(
      (house) => house.name === category
    );

    const visibleHouses = filteredByCategory.slice(
      0,
      viewMoreCount[category] || 3
    );

    return (
      <div key={category} className="category-section">
        <h4 className="mt-5">{category}</h4>
        <div className="row gx-0 gap-5 mt-3 mx-auto justify-content-center">
          {visibleHouses.length ? (
            visibleHouses.map((house, index) => (
              <div
                key={house._id}
                className="col-sm-4 col-md-5 col-lg-3 col-xl-3 card"
              >
                <Link
                  to={`/houseDetails/${house._id}`}
                  className="text-reset text-decoration-none"
                  target="_blank"
                >
                  <img
                    src={house.images?.exterior?.[0] || "default-image.jpg"}
                    className="card-img-top"
                    alt={house.name}
                  />

                  <div className="card-body">
                    <div className="card-content">
                      <h5>{house.name}</h5>
                      <p>{house.desp}</p>
                    </div>
                    <div className="card-btn text-end">
                      <button className="btn btn-outline-dark">Visit</button>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No houses available in this category.</p>
          )}
        </div>

        {filteredByCategory.length > (viewMoreCount[category] || 3) && (
          <div className="text-end me-5">
            <button
              className="btn btn-outline-warning mt-3"
              onClick={() => handleViewMore(category)}
            >
              View More
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="col-sm-12 col-md-12 col-lg-12 col-xl-12 main p-5">
      <div className="text-center findby">
        Search by
      </div>
      <div className="container input-group search-input mt-4 mb-5">
        <input
          type="text"
          className="form-control border border-dark"
          placeholder="Find me a Villa in 50 lakhs for around 1800 sqft..."
          aria-label="Enter your requirements..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="btn bg-light input-group-append"
          type="button"
          onClick={handleSearch}
        >
          <i className="fa fa-search"></i>
        </button>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <span className="findby text-center">Find by</span>
          <span className="col-2">
            <select
              id="designs"
              className="form-select find-select"
              onChange={(e) => setDesign(e.target.value)}
            >
              <option value="">Designs</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Villa">Villa</option>
              <option value="Building">Buildings</option>
              <option value="Complex">Complex</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Farmhouses">Farmhouses</option>
            </select>
          </span>
          <span className="col-2">
            <select
              id="price"
              className="form-select find-select"
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="">Price Range</option>
              <option value="10-20 lakhs">10-20 lakhs</option>
              <option value="20-30 lakhs">20-30 lakhs</option>
              <option value="30-40 lakhs">30-40 lakhs</option>
              <option value="40-50 lakhs">40-50 lakhs</option>
              <option value="50-70 lakhs">50-70 lakhs</option>
              <option value="70-100 lakhs">70-100 lakhs</option>
              <option value="100-500 lakhs">Above 1 Cr</option>
            </select>
          </span>
          <span className="col-2">
            <select
              id="area"
              className="form-select find-select"
              onChange={(e) => setArea(e.target.value)}
            >
              <option value="">Area Sq/Ft</option>
              <option value="500-1000 sq/ft">500-1000 sq/ft</option>
              <option value="1000-1500 sq/ft">1000-1500 sq/ft</option>
              <option value="1500-2500 sq/ft">1500-2000 sq/ft</option>
              <option value="2000-2500 sq/ft">2000-2500 sq/ft</option>
              <option value="2500-3000 sq/ft">2500-3000 sq/ft</option>
              <option value="3000-4000 sq/ft">3000-4000 sq/ft</option>
              <option value="4000-5000 sq/ft">4000-5000 sq/ft</option>
            </select>
          </span>
          <button
            id="findButton"
            className="col-1 btn btn-outline-light find-btn"
            onClick={filterHouses}
          >
            Find
          </button>
        </div>
      </div>

      <div className="container">
        {["Bungalow", "Villa", "Building", "Complex", "Office", "Appartment", "Cottage"].map((category) =>
          renderHouseListByCategory(category)
        )}
      </div>
    </main>
  );
};

export default Home;
