require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();

// ================= Middlewares =================
app.use(cors());
app.use(express.json());

// Serve frontend folder
app.use(express.static(path.join(__dirname, "..")));

// ================= MongoDB Connection =================
if (!process.env.MONGO_URI) {
  console.log("❌ MONGO_URI is missing in .env file");
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ================= Schema =================
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);

// ================= Contact Route =================
app.post("/contact", async (req, res) => {
  try {
    console.log("📩 Received Data:", req.body);

    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save to MongoDB
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();
    console.log("✅ Data Saved to MongoDB");

    // Check Email ENV variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("❌ EMAIL_USER or EMAIL_PASS missing in .env");
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

  await transporter.sendMail({
  from: `"Khushbu Portfolio" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_USER,
  subject: `🚀 New Portfolio Contact from ${name}`,
  html: `
  <div style="margin:0; padding:0; background-color:#f3f4f6; font-family:Segoe UI, Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
      <tr>
        <td align="center">
          
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 8px 20px rgba(0,0,0,0.08);">
            
            <!-- Header -->
            <tr>
              <td style="background:#14b8a6; padding:25px; text-align:center;">
                <h1 style="color:#ffffff; margin:0; font-size:22px;">
                  🚀 New Portfolio Contact Request
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px; color:#333;">
                
                <p style="font-size:16px;">Hello Khushbu 👋,</p>

                <p style="font-size:15px; line-height:1.6;">
                  You have received a new message from your portfolio website.
                  Someone is interested in connecting with you.
                </p>

                <hr style="margin:25px 0; border:none; border-top:1px solid #eee;">

                <table width="100%" cellpadding="10" cellspacing="0" style="font-size:14px;">
                  <tr>
                    <td style="background:#f9fafb; border-radius:8px;">
                      <strong>👤 Name:</strong> ${name}
                    </td>
                  </tr>
                  <tr>
                    <td style="height:10px;"></td>
                  </tr>
                  <tr>
                    <td style="background:#f9fafb; border-radius:8px;">
                      <strong>📧 Email:</strong> ${email}
                    </td>
                  </tr>
                  <tr>
                    <td style="height:10px;"></td>
                  </tr>
                  <tr>
                    <td style="background:#f9fafb; border-radius:8px;">
                      <strong>📱 Phone:</strong> ${phone}
                    </td>
                  </tr>
                </table>

                <div style="margin-top:25px;">
                  <strong style="font-size:14px;">💬 Message:</strong>
                  <div style="
                    margin-top:10px;
                    padding:18px;
                    background:#f1f5f9;
                    border-left:4px solid #14b8a6;
                    border-radius:8px;
                    line-height:1.6;
                    font-size:14px;">
                    ${message}
                  </div>
                </div>

                <p style="margin-top:30px; font-size:13px; color:#666;">
                  📅 Received on: ${new Date().toLocaleString()}
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#888;">
                © ${new Date().getFullYear()} Khushbu Portfolio <br>
                Built with ❤️ using Node.js & MongoDB
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </div>
  `
});

    console.log("📧 Email Sent Successfully");

    res.status(200).json({
      message: "Message sent successfully!"
    });

  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// ================= Start Server =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});