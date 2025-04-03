const express = require("express")
const connectDB = require("./db.js")
const itemModel = require("./models/item.js")
const cors = require("cors")
const multer = require("multer")
const path = require("path")

const app = express()
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads')) 

connectDB()
                                                                 // remove uploads login --url
// cloudinary images  // frontend---> img (multer acces image)--> cloudinary (image store)--> url 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) 
  }
});
const upload = multer({ storage: storage });

app.get("/", async (req, res) => {
    const response = await itemModel.find()
    return res.json({items: response})
})

app.post("/add-product", upload.single('image'), async (req, res) => {
    try {

        const newProduct = new itemModel({
            ItemType: req.body.ItemType,
            Item: req.body.Item,
            price: req.body.price,
            Location: req.body.Location,
            description: req.body.description,
            url: req.file ? `https://mernproject-ktcy.onrender.com/uploads/${req.file.filename}` : '',
            Date: new Date().toISOString()
        });

        // Save to database
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: "Failed to add product" });
    }
});

//get product by location
app.get("/products", async (req, res) => {
  try {
      const { location } = req.query;
      
      if (!location || location === "All Locations") {
          const response = await itemModel.find();
          return res.json({ items: response });
      }

      
      const response = await itemModel.find({ 
          Location: { $regex: new RegExp(location, "i") } 
      });

      return res.json({ items: response });
  } catch (error) {
      console.error("Error fetching products by location:", error);
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
        res.status(500).json({ error: "Error fetching product details" });
    }
});


  

app.listen(3000, () => {
    console.log("app is running")
})

//////////////////////////////////////////this ismy multer code actual

// const express = require("express");
// const connectDB = require("./db.js");
// const itemModel = require("./models/item.js");
// const cors = require("cors");
// const multer = require("multer");
// const cloudinary = require("cloudinary").v2;
// const path = require("path");
// const fs = require("fs");

// const app = express();
// app.use(express.json());
// app.use(cors());

// connectDB();

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: "dlls9cbxd",
//   api_key: "775339493857268",
//   api_secret: "clouds"
// });
// console.log("cloudanary config")
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)) 
//   }
// });
// const upload = multer({ storage: storage });

// app.get("/", async (req, res) => {
//   const response = await itemModel.find();
//   return res.json({ items: response });
// });

// app.post("/add-product", upload.single('image'), async (req, res) => {
//   try {
//     let imageUrl = '';

//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path);
//       imageUrl = result.secure_url;
//       fs.unlinkSync(req.file.path); // Delete file after uploading
//     }

//     const newProduct = new itemModel({
//       ItemType: req.body.ItemType,
//       Item: req.body.Item,
//       price: req.body.price,
//       Location: req.body.Location,
//       description: req.body.description,
//       url: imageUrl,
//       Date: new Date().toISOString()
//     });

//     const savedProduct = await newProduct.save();
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     console.error("Error adding product:", error);
//     res.status(500).json({ error: "Failed to add product" });
//   }
// });

// // Get product by location
// app.get("/products", async (req, res) => {
//   try {
//     const { location } = req.query;
    
//     if (!location || location === "All Locations") {
//       const response = await itemModel.find();
//       return res.json({ items: response });
//     }

//     const response = await itemModel.find({ 
//       Location: { $regex: new RegExp(location, "i") } 
//     });

//     return res.json({ items: response });
//   } catch (error) {
//     console.error("Error fetching products by location:", error);
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// });

// // Get product by ID
// app.get("/product/:id", async (req, res) => {
//   try {
//     const product = await itemModel.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching product details" });
//   }
// });

// app.listen(3000, () => {
//   console.log("app is running");
// });
