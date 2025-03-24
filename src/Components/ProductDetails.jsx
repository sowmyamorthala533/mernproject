import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("All Locations");
  const navigate = useNavigate();

 
  useEffect(() => {
    fetch("http://localhost:3000/items")//replaces images with  items in endpoint
      .then((res) => res.json())
      .then((data) => {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        const combinedData = [...data, ...storedProducts]; 
        setResults(combinedData);
      })
      .catch((err) => console.error("Error fetching all products:", err));
  }, []);

  useEffect(() => {
   
    fetch(`http://localhost:3000/items/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product not found in API");
        }
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch(() => {
 
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        const localProduct = storedProducts.find((item) => item.id.toString() === id);
        if (localProduct) {
          setProduct(localProduct);
        } else {
          console.error("Product not found in localStorage either.");
        }
      });
  }, [id]);
  const handleSearch = (query, location) => {
    setCurrentLocation(location || "All Locations");
    
    if (!query.trim() && (!location || location === "All Locations" || location === "Select Location")) {
      setFilteredResults([]);
      setShowSearchResults(false);
      return;
    }
    
    let filtered = results;
    if (query.trim()) {
      filtered = filtered.filter((item) =>
        item.ItemType.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (location && location !== "All Locations" && location !== "Select Location") {
      if (location === "Current Location" && navigator.geolocation) {
        console.log("Current location filtering would be applied here");
      } else {

        filtered = filtered.filter((item) =>
          item.Location && item.Location.toLowerCase() === location.toLowerCase()
        );
      }
    }
    
    setFilteredResults(filtered);
    setShowSearchResults(true);
  };
  const handleProductClick = (productId) => {
    navigate(`/Routingpage/product/${productId}`);
    setShowSearchResults(false);
  };

  if (!product && !showSearchResults) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid my-5">
      <Header onSearch={handleSearch} />
      
      {showSearchResults ? (
        // Display search results with location info
        <div className="container mt-4">
          <h3 className="mb-2">Search Results</h3>
          {currentLocation !== "All Locations" && currentLocation !== "Select Location" && (
            <p className="text-muted mb-4">
              Showing results for location: <span className="fw-bold text-success">{currentLocation}</span>
            </p>
          )}
          
          <div className="row">
            {filteredResults.length > 0 ? (
              filteredResults.map((image) => (
                <div key={image.id} className="col-md-4 mb-4">
                  <div 
                    className="card" 
                    onClick={() => handleProductClick(image.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={image.url}
                      className="card-img-top"
                      alt={image.ItemType}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{image.ItemType}</h5>
                      <h5 className="card-title">{image.Item}</h5>
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-geo-alt-fill text-success me-2"></i>
                        <h5 className="card-title mb-0">{image.Location || "No location specified"}</h5>
                      </div>
                      <strong className="card-title">{image.price}</strong>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-5">
                <p className="mb-2 fs-5">No results found for the selected criteria.</p>
                <p className="text-muted">Try a different search term or location.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="container px-4">
          <div className="row mb-4">
            {/* Image column */}
            <div className="col-lg-6 mb-4">
              <div 
                className="h-100 position-relative overflow-hidden" 
                style={{ 
                  borderRadius: "8px",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(40,167,69,0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
                }}
              >
                <img
                  src={product.url}
                  className="w-100"
                  alt={product.ItemType}
                  style={{ 
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                    maxHeight: "400px"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "scale(1.03)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "scale(1)";
                  }}
                />
              </div>
            </div>
            
            {/* Product details column */}
            <div className="col-lg-6">
              <div 
                className="card p-4 h-100" 
                style={{ 
                  borderRadius: "8px",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                  border: "none",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(40,167,69,0.15)";
                  e.currentTarget.style.borderLeft = "4px solid #28a745";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.05)";
                  e.currentTarget.style.borderLeft = "none";
                }}
              >
                <div className="text-start">
                  <h3 
                    className="mb-3 fw-bold" 
                    style={{ 
                      borderBottom: "2px solid #f0f0f0", 
                      paddingBottom: "10px",
                      fontFamily: "Arial, sans-serif",
                      transition: "color 0.3s ease, border-bottom 0.3s ease" 
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = "#28a745";
                      e.target.style.borderBottom = "2px solid #28a745";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = "#212529";
                      e.target.style.borderBottom = "2px solid #f0f0f0";
                    }}
                  >
                    {product.ItemType}
                  </h3>
                  
                  <h4 
                    className="mb-3"
                    style={{ 
                      fontFamily: "Arial, sans-serif",
                      fontWeight: "500",
                      transition: "color 0.3s ease" 
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = "#28a745";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = "#212529";
                    }}
                  >
                    {product.Item}
                  </h4>
                  
                  <div className="mt-4">
                    <strong 
                      className="text-success fs-4 d-inline-block" 
                      style={{ 
                        padding: "8px 12px",
                        borderRadius: "5px",
                        fontFamily: "Arial, sans-serif",
                        transition: "all 0.3s ease" 
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#28a74520";
                        e.target.style.color = "#28a745";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "#28a745";
                      }}
                    >
                      Price: {product.price}
                    </strong>
                  </div>
                  
                  {/* Seller Information */}
                  <div className="mt-4">
                    <h5 
                      className="text-muted mb-3 fw-bold" 
                      style={{ 
                        borderBottom: "2px solid #f0f0f0", 
                        paddingBottom: "10px",
                        fontFamily: "Arial, sans-serif",
                        transition: "all 0.3s ease"
                      }}
                      onMouseOver={(e) => {
                        e.target.style.color = "#28a745";
                        e.target.style.borderBottom = "2px solid #28a745";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.color = "#6c757d";
                        e.target.style.borderBottom = "2px solid #f0f0f0";
                      }}
                    >
                      Seller Information
                    </h5>
                    
                    <h5 
                      className="card-title mb-2"
                      style={{ 
                        fontFamily: "Arial, sans-serif",
                        fontWeight: "600",
                        transition: "color 0.3s ease" 
                      }}
                      onMouseOver={(e) => {
                        e.target.style.color = "#28a745";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.color = "#212529";
                      }}
                    >
                      {product.seller}
                    </h5>
                    
                    <h5 
                      className="card-title mb-2"
                      style={{ 
                        fontFamily: "Arial, sans-serif",
                        fontWeight: "500",
                        transition: "color 0.3s ease" 
                      }}
                      onMouseOver={(e) => {
                        e.target.style.color = "#28a745";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.color = "#212529";
                      }}
                    >
                      {product.Name}
                    </h5>
                    
                    <h5 
                      className="card-title"
                      style={{ 
                        fontFamily: "Arial, sans-serif",
                        fontWeight: "600",
                        transition: "color 0.3s ease",
                        cursor: "pointer"
                      }}
                      onMouseOver={(e) => {
                        e.target.style.color = "#28a745";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.color = "#212529";
                      }}
                    >
                      Contact: {product.ph_no}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Second row for description and location map */}
          <div className="row mb-4">
            {/* Description column */}
            {product.description && (
              <div className="col-lg-6 mb-4">
                <div 
                  className="card p-4 h-100" 
                  style={{ 
                    borderRadius: "8px",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                    border: "none",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(40,167,69,0.15)";
                    e.currentTarget.style.borderLeft = "4px solid #28a745";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.05)";
                    e.currentTarget.style.borderLeft = "none";
                  }}
                >
                  <div className="text-start">
                    <h5 
                      className="text-muted mb-3 fw-bold" 
                      style={{ 
                        borderBottom: "2px solid #f0f0f0", 
                        paddingBottom: "10px",
                        fontFamily: "Arial, sans-serif",
                        transition: "all 0.3s ease"
                      }}
                      onMouseOver={(e) => {
                        e.target.style.color = "#28a745";
                        e.target.style.borderBottom = "2px solid #28a745";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.color = "#6c757d";
                        e.target.style.borderBottom = "2px solid #f0f0f0";
                      }}
                    >
                      Product Description
                    </h5>
                    
                    <ul className="list-group list-group-flush">
                      {Object.entries(product.description).map(([key, value]) => (
                        <li 
                          key={key} 
                          className="list-group-item px-0"
                          style={{
                            backgroundColor: "transparent",
                            borderBottom: "1px solid #f0f0f0",
                            transition: "all 0.3s ease"
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = "#f8f9fa";
                            e.currentTarget.style.paddingLeft = "8px";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.paddingLeft = "0px";
                          }}
                        >
                          <span 
                            className="fw-bold text-capitalize"
                            style={{ color: "#6c757d" }}
                          >
                            {key.replace(/_/g, ' ')}:
                          </span>{' '}
                          <span>{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {/* Location Map column */}
            {product.Location && (
              <div className="col-lg-6 mb-4">
                <div 
                  className="card p-4 h-100" 
                  style={{ 
                    borderRadius: "8px",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                    border: "none",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(40,167,69,0.15)";
                    e.currentTarget.style.borderLeft = "4px solid #28a745";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.05)";
                    e.currentTarget.style.borderLeft = "none";
                  }}
                >
                  <div className="text-start">
                    <h5 
                      className="text-muted mb-3 fw-bold" 
                      style={{ 
                        borderBottom: "2px solid #f0f0f0", 
                        paddingBottom: "10px",
                        fontFamily: "Arial, sans-serif",
                        transition: "all 0.3s ease"
                      }}
                      onMouseOver={(e) => {
                        e.target.style.color = "#28a745";
                        e.target.style.borderBottom = "2px solid #28a745";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.color = "#6c757d";
                        e.target.style.borderBottom = "2px solid #f0f0f0";
                      }}
                    >
                      Location Map
                    </h5>
                    
                    <div className="map-container mb-3">
                      {/* Replace the below div with actual map implementation */}
                      <iframe 
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(product.Location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                        width="100%" 
                        height="300" 
                        style={{
                          border: "none",
                          borderRadius: "8px",
                          boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
                        }}
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Location Map"
                      ></iframe>
                    </div>
                    
                    <div 
                      className="d-flex align-items-center p-2"
                      style={{
                        backgroundColor: "#f8f9fa",
                        borderRadius: "5px"
                      }}
                    >
                      <i className="bi bi-geo-alt-fill text-success me-2 fs-5"></i>
                      <span>
                        <strong>Address:</strong> {product.Location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <Footer className="bg-secondary text-white py-5 mt-5"/>
    </div>
  );
};

export default ProductDetails;