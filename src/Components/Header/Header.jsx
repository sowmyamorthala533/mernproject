import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const Header = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Select Location");
  const [locations, setLocations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Fetch locations from JSON file
  useEffect(() => {
    // In a real implementation, you would use fetch or axios to get the data
    // For this example, I'm simulating loading from a JSON file
    const fetchLocations = async () => {
      try {
        // This would be replaced with actual fetch call in production
        // const response = await fetch('/locations.json');
        // const data = await response.json();
        
        // Simulated data
        const data = {
          locations: [
            { id: 1, name: "Hyderabad" },
            { id: 2, name: "Bangalore" },
            { id: 3, name: "Chennai" },
            { id: 4, name: "Kerala" }
          ]
        };
        
        setLocations(data.locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    
    fetchLocations();
  }, []);

  const handleSearch = () => {
    onSearch(query, location); // Pass both query and location to parent component
  };

  const handleLocationSelect = (locationName) => {
    setLocation(locationName);
    setShowDropdown(false);
    
    // Trigger search with new location but keep the same query
    onSearch(query, locationName);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real implementation, you would reverse geocode the coordinates
          // to get the actual location name using a service like Google Maps API
          setLocation("Current Location");
          setShowDropdown(false);
          
          // Trigger search with "Current Location"
          onSearch(query, "Current Location");
          
          // You could store the coordinates for later use
          const coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log("User coordinates:", coordinates);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">ReNew Mart</a>
        
        {/* Location Dropdown */}
        <div className="dropdown me-3">
          <button 
            className="btn btn-outline-secondary d-flex align-items-center" 
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FaMapMarkerAlt className="me-2" />
            <span>{location}</span>
          </button>
          
          {showDropdown && (
            <div className="dropdown-menu show position-absolute mt-1">
              <button 
                className="dropdown-item d-flex align-items-center"
                onClick={getCurrentLocation}
              >
                <FaMapMarkerAlt className="me-2 text-primary" />
                <span>Use current location</span>
              </button>
              
              <button 
                className="dropdown-item"
                onClick={() => handleLocationSelect("All Locations")}
              >
                All Locations
              </button>
              
              <div className="dropdown-divider"></div>
              <h6 className="dropdown-header">Popular Locations</h6>
              
              {locations.map(loc => (
                <button 
                  key={loc.id} 
                  className="dropdown-item"
                  onClick={() => handleLocationSelect(loc.name)}
                >
                  {loc.name}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Search Bar */}
        <div className="d-flex flex-grow-1 position-relative">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Item Type..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <button
              className="btn btn-dark d-flex align-items-center justify-content-center"
              type="button"
              onClick={handleSearch}
            >
              <FaSearch color="white" />
            </button>
          </div>
        </div>
        
        {/* Profile and Sell Button */}
        <div className="d-flex align-items-center ms-3">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="rounded-circle me-3 border border-dark"
            style={{ width: "40px", height: "40px" }}
          />
          <button
            className="btn btn-light border border-dark"
            onClick={() => navigate("/sell")}
          >
            Sell
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;


