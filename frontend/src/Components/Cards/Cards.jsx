import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Banner from "../Banner/Banner";
import HeaderName from "../Header/Header"; // Updated import
import Categories from "../Categories";

const Cards = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");

  useEffect(() => {
    fetchItemsByLocation(selectedLocation);
  }, [selectedLocation]);

  const fetchItemsByLocation = async (location) => {
    try {
      // Use the new endpoint with location query parameter
      const res = await fetch(`https://mernproject-9zje.onrender.com/products?location=${location}`);
      const data = await res.json();
      
      setItems(data.items);
      setFilteredItems(data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to handle search filtering
  const handleSearch = (query, location) => {
    setSearchQuery(query);
    setSelectedLocation(location);

    let filtered = items;

    // Filter by item type if query exists
    if (query) {
      filtered = filtered.filter((item) =>
        item.ItemType.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Additional filtering by location
    if (location && location !== "Select Location" && location !== "All Locations") {
      filtered = filtered.filter((item) =>
        item.Location.toLowerCase() === location.toLowerCase()
      );
    }

    setFilteredItems(filtered);
  };

  return (
    <>
      {/* Passing search function to Header */}
      <HeaderName onSearch={handleSearch} />
      <Banner />
      <Categories />

      {filteredItems.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "20px" }}>No items found</p>
      ) : (
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          justifyContent: "center",
          gap: "20px",
          padding: "20px"
        }}>
          {filteredItems.map((i, index) => (
            <Link
              key={i._id}
              to={`/Routingpage/product/${i._id}`}
              style={{ 
                textDecoration: "none", 
                color: "inherit",
                width: "250px"
              }}
            >
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "transform 0.3s ease"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <img
                  src={i.url}
                  alt="Item"
                  style={{ 
                    width: "200px", 
                    height: "200px", 
                    objectFit: "cover",
                    borderRadius: "8px"
                  }}
                />
                <div style={{ marginTop: "10px" }}>
                  <p><strong>Price:</strong> ₹{i.price}</p>
                  <p><strong>Type:</strong> {i.ItemType}</p>
                  <p><strong>Item:</strong> {i.Item}</p>
                  <p><strong>Location:</strong> {i.Location}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Cards;
