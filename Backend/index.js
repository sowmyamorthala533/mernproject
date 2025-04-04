
require("dotenv").config();
const express = require("express");
const connectDB = require("./db.js");
const itemModel = require("./models/item.js");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");
 // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

// Cloudinary configuration using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer Storage (store locally before Cloudinary upload)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Fetch all products
app.get("/", async (req, res) => {
  try {
    const response = await itemModel.find();
    res.json({ items: response });
  } catch (error) {
    console.error(" Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Add product with image upload
app.post("/add-product", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = "";

    console.log("Uploading product:", req.body);

    if (req.file) {
      console.log(" Image file received:", req.file.filename);
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log(" Cloudinary upload result:", result);
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path); // Remove local file
    } else {
      console.warn(" No image file uploaded!");
    }

    const { ItemType, Item, price, Location, description } = req.body;

    if (!ItemType || !Item || !price || !Location) {
      return res.status(400).json({ error: "All required fields must be filled!" });
    }

    const newProduct = new itemModel({
      ItemType,
      Item,
      price,
      Location,
      description: description || "",
      url: imageUrl,
      Date: new Date().toISOString(),
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
});

// Search products by filters
app.get("/products", async (req, res) => {
  try {
    const { location, itemType } = req.query;
    const query = {};

    if (location && location !== "All Locations") {
      query.Location = { $regex: new RegExp(location, "i") };
    }
    if (itemType) {
      query.ItemType = { $regex: new RegExp(itemType, "i") };
    }

    const response = await itemModel.find(query);
    res.json({ items: response });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get product by ID
app.get("/product/:id", async (req, res) => {
  try {
    const product = await itemModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product details" });
  }
});
const PORT = 3000 || 5000
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
