const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

// POST /api/contacts
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // 1. Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        message: "Please fill all fields.",
      });
    }

    // 2. Save contact information to MongoDB
    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });

    await newContact.save();

    console.log("Contact saved to MongoDB successfully");

    // 3. Create Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 4. Verify Gmail connection
    await transporter.verify();

    console.log("Gmail transporter is ready");

    // 5. Email details
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: "🚀 New Contact Inquiry from Portfolio",

      html: `
        <div style="
          font-family: Arial, sans-serif;
          background-color: #f4f6f9;
          padding: 30px;
        ">

          <div style="
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          ">

            <h2 style="
              color: #2E86C1;
              text-align: center;
              margin-bottom: 10px;
            ">
              📩 New Portfolio Contact Request
            </h2>

            <p style="font-size: 16px; color: #333;">
              Hello Khushbu 👋,
            </p>

            <p style="font-size: 15px; color: #555;">
              You have received a new message from your portfolio website.
              The person is interested in connecting with you.
              Here are the details:
            </p>

            <hr style="margin: 20px 0;" />

            <p>
              <strong>👤 Name:</strong> ${name}
            </p>

            <p>
              <strong>📧 Email:</strong> ${email}
            </p>

            <p>
              <strong>📱 Phone:</strong> ${phone}
            </p>

            <p style="margin-top: 15px;">
              <strong>💬 Message:</strong>
            </p>

            <div style="
              background-color: #f9f9f9;
              padding: 15px;
              border-radius: 8px;
              border-left: 4px solid #2E86C1;
              color: #444;
            ">
              ${message}
            </div>

            <hr style="margin: 25px 0;" />

            <p style="
              font-size: 13px;
              color: gray;
              text-align: center;
            ">
              This email was automatically generated from your
              portfolio contact form.
            </p>

          </div>
        </div>
      `,
    };

    // 6. Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.messageId);

    // 7. Send success response to frontend
    return res.status(200).json({
      message: "Message sent successfully!",
    });

  } catch (error) {
    console.error("CONTACT FORM ERROR:", error);

    // Send actual error to frontend during development
    return res.status(500).json({
      message: error.message || "Error sending message",
    });
  }
});

module.exports = router;