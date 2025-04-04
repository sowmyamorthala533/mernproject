// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Sell = () => {
//   const navigate = useNavigate();
//   const [itemType, setItemType] = useState("");
//   const [item, setItem] = useState("");
//   const [price, setPrice] = useState("");
//   const [location, setLocation] = useState("");
//   const [description, setDescription] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
    
//     if (!itemType || !item || !price || !location || !selectedFile) {
//       alert("Please fill in all fields and select an image!");
//       return;
//     }

//     // Create FormData to send file and other data
//     const formData = new FormData();
//     formData.append('ItemType', itemType);
//     formData.append('Item', item);
//     formData.append('price', price);
//     formData.append('Location', location);
//     formData.append('description', description);
//     formData.append('image', selectedFile);

//     try {
//       const response = await fetch("http://localhost:3000/add-product", {
//         method: "POST",
//         body: formData, // No need to set Content-Type, it's set automatically
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add product');
//       }

//       const result = await response.json();
//       alert("Product Added Successfully!");
//       navigate("/Routingpage"); // Redirect to Home Page
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert("Failed to add product. Please try again.");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <form onSubmit={handleSubmit} className="card p-4 mx-auto" style={{ maxWidth: "500px" }}>
//         <div className="mb-3">
//           <label className="form-label">Item Type:</label>
//           <input 
//             type="text" 
//             className="form-control" 
//             value={itemType} 
//             onChange={(e) => setItemType(e.target.value)} 
//             required 
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Item Name:</label>
//           <input 
//             type="text" 
//             className="form-control" 
//             value={item} 
//             onChange={(e) => setItem(e.target.value)} 
//             required 
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Price:</label>
//           <input 
//             type="number" 
//             className="form-control" 
//             value={price} 
//             onChange={(e) => setPrice(e.target.value)} 
//             required 
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Location:</label>
//           <input 
//             type="text" 
//             className="form-control" 
//             value={location} 
//             onChange={(e) => setLocation(e.target.value)} 
//             required 
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Description:</label>
//           <textarea 
//             className="form-control" 
//             value={description} 
//             onChange={(e) => setDescription(e.target.value)} 
//             required 
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Upload Image:</label>
//           <input 
//             type="file" 
//             className="form-control" 
//             onChange={handleFileChange} 
//             required 
//           />
//           <p className="mt-2">{selectedFile ? `File Selected: ${selectedFile.name}` : "No Image Selected"}</p>
//         </div>
//         <button type="submit" className="btn btn-success w-100">Upload & Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Sell;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sell = () => {
  const navigate = useNavigate();
  const [itemType, setItemType] = useState("");
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!itemType || !item || !price || !location || !selectedFile) {
      alert("Please fill in all fields and select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("ItemType", itemType);
    formData.append("Item", item);
    formData.append("price", price.toString()); // cast to string
    formData.append("Location", location);
    formData.append("description", description);
    formData.append("image", selectedFile); // name must match multer field

    try {
      const response = await fetch("http://localhost:3000/add-product", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to add product");
      }

      alert("Product Added Successfully!");
      navigate("/Routingpage");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product: " + error.message);
    }
  };

  return (
    <div className="container mt-4">
      <form
        onSubmit={handleSubmit}
        className="card p-4 mx-auto"
        style={{ maxWidth: "500px" }}
      >
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
          <label className="form-label">Location:</label>
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Image:</label>
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={handleFileChange}
            required
          />
          <p className="mt-2">
            {selectedFile
              ? `File Selected: ${selectedFile.name}`
              : "No Image Selected"}
          </p>
        </div>
        <button type="submit" className="btn btn-success w-100">
          Upload & Submit
        </button>
      </form>
    </div>
  );
};

export default Sell;
