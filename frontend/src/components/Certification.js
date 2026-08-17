import React from "react";

// Add your certifications here
const certifications = [
  {
    title: "Hero Campus Challenge",
    platform: "Hero Campus",
    certificate: "/assets/Hero_Campus_Certificate.pdf", // put PDF in public/assets
  },
  {
    title: "Power BI Certification",
    platform: "Future Skills Prime",
    certificate: "/assets/PowerBI_Certificate.pdf",
  },
  // Add more certifications if needed
];

function Certification() {
  return (
    <section className="certification" id="certification">
      <h2 data-aos="fade-up">Certifications</h2>
      <div className="certification-cards">
        {certifications.map((cert, index) => (
          <div
            className="cert-card"
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 200}
          >
            <h3>{cert.title}</h3>
            <p>{cert.platform}</p>
            {cert.certificate && (
              <a href={cert.certificate} download>
                <button className="cert-btn">Download Certificate</button>
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certification;