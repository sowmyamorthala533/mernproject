import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sell = () => {
  const navigate = useNavigate();
  const [itemType, setItemType] = useState("");
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!itemType || !item || !price || !selectedFile) {
      alert("Please fill in all fields and select an image!");
      return;
    }

    const newProduct = {
      id: Date.now().toString(), // Generate unique ID
      ItemType: itemType,
      Item: item,
      price: price,
      url: URL.createObjectURL(selectedFile), // Temporary image URL
    };

    // Save to backend (JSON server)
    fetch("http://localhost:3000/images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then(() => {
        alert("Product Added Successfully!");
        navigate("/Routingpage"); // Redirect to Home Page
      })
      .catch((err) => console.error("Error adding product:", err));
  };

  return (
    <div className="container mt-4">
      
      <form onSubmit={handleSubmit} className="card p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <div className="mb-3">
          <label className="form-label">Item Type:</label>
          <input 
            type="text" 
            className="form-control" 
            value={itemType} 
            onChange={(e) => setItemType(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Item Name:</label>
          <input 
            type="text" 
            className="form-control" 
            value={item} 
            onChange={(e) => setItem(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input 
            type="number" 
            className="form-control" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Image:</label>
          <input 
            type="file" 
            className="form-control" 
            onChange={handleFileChange} 
            required 
          />
          <p className="mt-2">{selectedFile ? `File Selected: ${selectedFile.name}` : "No Image Selected"}</p>
        </div>
        <button type="submit" className="btn btn-success w-100">Upload & Submit</button>
      </form>
    </div>
  );
};

export default Sell;