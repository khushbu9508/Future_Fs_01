require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();

/* ================= Middlewares ================= */

app.use(cors());
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html on root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


/* ================= MongoDB Connection ================= */

if (!process.env.MONGO_URI) {
  console.log("❌ MONGO_URI is missing in Render Environment Variables");
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => {
    console.log("❌ MongoDB Error:", err);
    process.exit(1); // Stop app if DB fails
  });


/* ================= Schema ================= */

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);


/* ================= Contact Route ================= */

app.post("/contact", async (req, res) => {
  try {

    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save to MongoDB
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();
    console.log("✅ Data Saved to MongoDB");

    // Check Email ENV
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("❌ EMAIL_USER or EMAIL_PASS missing in Render");
      return res.status(500).json({ message: "Email configuration error" });
    }

    // Email Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send Email
    await transporter.sendMail({
      from: `"Khushbu Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🚀 New Portfolio Contact from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `
    });

    console.log("📧 Email Sent Successfully");

    res.status(200).json({ message: "Message sent successfully!" });

  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


/* ================= Start Server ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});