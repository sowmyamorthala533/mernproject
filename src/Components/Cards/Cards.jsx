import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Banner from "../Banner/Banner";
import Header from "../Header/Header";
import Categories from "../Categories";
const cardStyle = {
  transition: "transform 0.3s, box-shadow 0.3s",
};

const cardHoverStyle = {
  transform: "translateY(-5px)",
  boxShadow: "0 10px 20px rgba(0, 128, 0, 0.2)",
  borderColor: "#28a745"
};

const Cards = () => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("All Locations");
  const [currentItemType, setCurrentItemType] = useState("All Categories");
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    // Fetch from API
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((data) => {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        const combinedData = [...data, ...storedProducts]; // Merge API & local data
        setResults(combinedData);
        setFilteredResults(combinedData);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleSearch = (query, location) => {
    // Update the current location
    setCurrentLocation(location || "All Locations");

    // Start with all results
    let filtered = results;

    // Filter by search query if provided
    if (query && query.trim()) {
      filtered = filtered.filter((image) =>
        image.ItemType.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by location if selected
    if (location && location !== "All Locations" && location !== "Select Location") {
      if (location === "Current Location" && navigator.geolocation) {
        console.log("Current location filtering would be applied here");
      } else {
        // Filter by exact location match
        filtered = filtered.filter((image) =>
          image.Location && image.Location.toLowerCase() === location.toLowerCase()
        );
      }
    }

    if (currentItemType !== "All Categories") {
      filtered = filtered.filter((image) =>
        image.ItemType && image.ItemType === currentItemType
      );
    }

    setFilteredResults(filtered);
  };

  const handleItemTypeFilter = (itemType) => {
    setCurrentItemType(itemType);

    let filtered = results;

  
    if (itemType !== "All Categories") {
      filtered = filtered.filter((image) =>
        image.ItemType && image.ItemType === itemType
      );
    }


    if (currentLocation !== "All Locations" && currentLocation !== "Select Location") {
      if (currentLocation === "Current Location" && navigator.geolocation) {

      } else {
        filtered = filtered.filter((image) =>
          image.Location && image.Location.toLowerCase() === currentLocation.toLowerCase()
        );
      }
    }

    setFilteredResults(filtered);
  };

  return (
    <div className="container mt-4">
      <Header onSearch={handleSearch} />

      <Categories
        currentItemType={currentItemType}
        onCategoryChange={handleItemTypeFilter}
      />
      <div className="mb-4">
        <Banner />
      </div>

      {currentLocation !== "All Locations" && currentLocation !== "Select Location" && (
        <div className="alert alert-success mb-4">
          <div className="d-flex align-items-center">
            <i className="bi bi-geo-alt-fill me-2"></i>
            <span>Showing products in: <strong>{currentLocation}</strong></span>
          </div>
        </div>
      )}

   
      {currentItemType !== "All Categories" && (
        <div className="alert alert-success mb-4">
          <div className="d-flex align-items-center">
            <i className="bi bi-tag-fill me-2"></i>
            <span>Category: <strong>{currentItemType}</strong></span>
          </div>
        </div>
      )}

      <div className="row">
        {filteredResults.length > 0 ? (
          filteredResults.map((image) => (
            <div key={image.id} className="col-md-4 mb-4">
              <Link
                to={`/Routingpage/product/${image.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  className="card h-100 shadow-sm"
                  style={{
                    ...cardStyle,
                    ...(hoveredCard === image.id ? cardHoverStyle : {})
                  }}
                  onMouseEnter={() => setHoveredCard(image.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <img
                    src={image.url}
                    className="card-img-top"
                    alt={image.ItemType}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-success">{image.ItemType}</h5>
                    <h5 className="card-title text-success">{image.Item}</h5>
                    <strong className="card-title text-success mb-2">{image.price}</strong>

                    {image.Location && (
                      <div className="mt-auto d-flex align-items-center">
                        <i className="bi bi-geo-alt-fill text-success me-1"></i>
                        <h6 className="card-subtitle text-success mb-0">{image.Location}</h6>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="mb-4">
              <i className="bi bi-search" style={{ fontSize: "3rem", color: "#28a745" }}></i>
            </div>
            <h4 className="text-success">No products found</h4>
            {currentLocation !== "All Locations" && currentLocation !== "Select Location" ? (
              <p className="text-success">
                No items available in {currentLocation}. Try selecting a different location.
              </p>
            ) : currentItemType !== "All Categories" ? (
              <p className="text-success">
                No items available in the {currentItemType} category. Try selecting a different category.
              </p>
            ) : (
              <p className="text-success">
                Try adjusting your search criteria.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;
