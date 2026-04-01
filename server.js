const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("YOUR_MONGO_URI");

const Vendor = mongoose.model("Vendor", {
  name: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number],
  },
  isLive: Boolean,
});

// 🔥 Vendor updates location
app.post("/update", async (req, res) => {
  const { name, lat, lng } = req.body;

  await Vendor.findOneAndUpdate(
    { name },
    {
      name,
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
      isLive: true,
    },
    { upsert: true }
  );

  res.send("Updated");
});

// 🔥 User gets nearby vendors
app.get("/vendors", async (req, res) => {
  const { lat, lng } = req.query;

  const vendors = await Vendor.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(lng), parseFloat(lat)],
        },
        $maxDistance: 2000,
      },
    },
    isLive: true,
  });

  res.json(vendors);
});

app.listen(3000, () => console.log("Server running"));
