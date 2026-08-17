import React, { useState } from "react";

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSubmitted(false);

    try {
      const res = await fetch("http://localhost:5000/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
        }),
      });

      const data = await res.json();

      console.log("Backend response:", data);

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      // Show success message
      setSubmitted(true);

      // Clear form
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error("Contact form error:", error);

      alert(
        "Unable to send message. Please make sure the backend server is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact" data-aos="fade-up">
      <h2 data-aos="fade-up">Contact Me</h2>

      <form className="contact-form" onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter Your Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Your Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Enter Your Phone"
          pattern="[0-9]{10}"
          title="Enter a valid 10-digit phone number"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          placeholder="Enter Your Message here..."
          rows="5"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <button
          type="submit"
          className="contact-btn"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

      </form>

      {submitted && (
        <p className="success-message">
          ✅ Message Sent Successfully!
        </p>
      )}
    </section>
  );
}

export default Contact;