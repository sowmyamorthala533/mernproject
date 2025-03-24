import React from "react";

// List of available item types for filtering
export const itemCategories = [
  "All Categories", 
  "Vehicles", 
  "Furniture", 
  "Real Estate", 
  "Electronics"
];

// Categories component that displays filter buttons with green styling
const Categories = ({ currentItemType, onCategoryChange }) => {
  return (
    <div className="container mt-4 mb-4">
      <div className="d-flex flex-wrap justify-content-center gap-3">
        {itemCategories.map((category) => (
          <button
            key={category}
            className={`btn ${
              currentItemType === category ? "btn-success" : "btn-outline-success"
            } px-4`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;