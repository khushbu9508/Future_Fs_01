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
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ================= MongoDB Connection ================= */

if (!process.env.MONGO_URI) {
  console.log("❌ MONGO_URI is missing in environment variables");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

/* ================= Schema ================= */

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);

/* ================= Contact Route ================= */

app.post("/contact", async (req, res) => {
  try {
    console.log("📩 Incoming request body:", req.body);

    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save to MongoDB
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();
    console.log("✅ Data Saved to MongoDB");

    // Check Email ENV
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("❌ EMAIL_USER or EMAIL_PASS missing");
      return res.status(500).json({ message: "Email configuration error" });
    }

    // Email Transporter (More Reliable Config)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Verify transporter
    await transporter.verify();
    console.log("✅ Email server ready");

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

    return res.status(200).json({
      success: true,
      message: "✅ Your message has been sent successfully!"
    });

  } catch (error) {
    console.error("❌ Server Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* ================= Start Server ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("=================================");
  console.log("🚀 Server is running successfully!");
  console.log(`🌐 Local URL: http://localhost:${PORT}`);
  console.log("=================================");
});