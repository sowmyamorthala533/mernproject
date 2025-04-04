import React from "react";

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
            } px-3 py-2 d-block d-md-block 
              btn-sm-custom`} // Custom class for mobile sizing
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

// Add a style tag to handle custom mobile sizing
const style = `
  @media (max-width: 767px) {
    .btn-sm-custom {
      padding: 0.25rem 0.5rem !important;
      font-size: 0.75rem !important;
      height: 32px;
    }
  }
`;

// Inject the style into the document
const styleTag = document.createElement('style');
styleTag.textContent = style;
document.head.appendChild(styleTag);

export default Categories;