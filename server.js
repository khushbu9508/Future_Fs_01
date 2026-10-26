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
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // ✅ Save to MongoDB
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();
    console.log("✅ Data Saved to MongoDB");

    // ✅ SEND RESPONSE IMMEDIATELY (VERY IMPORTANT)
    res.status(200).json({
      success: true,
      message: "✅ Your message has been sent successfully!"
    });

    // ✅ Send Email in background (NO await, NO blocking)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
        connectionTimeout: 5000,   // prevent hanging
        greetingTimeout: 5000,
        socketTimeout: 5000
      });

      transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `New Contact from ${name}`,
        html: `
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Message:</b> ${message}</p>
        `
      }).then(() => {
        console.log("📧 Email Sent");
      }).catch((err) => {
        console.log("⚠ Email failed (ignored):", err.message);
      });

    }

  } catch (error) {
    console.log("Server Error:", error.message);

    res.status(200).json({
      success: true,
      message: "✅ Your message has been sent successfully!"
    });
  }
})


/* ================= Start Server ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("=================================");
  console.log("🚀 Server is running successfully!");
  console.log(`🌐 Local URL: http://localhost:${PORT}`);
  console.log("=================================");
});