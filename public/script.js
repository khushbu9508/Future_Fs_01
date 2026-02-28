document.addEventListener("DOMContentLoaded", function () {

  /* ================= TYPING EFFECT ================= */

  const roles = [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "MERN Stack Developer",
    "ServiceNow Enthusiast"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingElement = document.querySelector(".typing");

  function typeEffect() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1000);
        return;
      }
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }

  typeEffect();


  /* ================= SECTION TITLE REVEAL ================= */

  const sectionTitles = document.querySelectorAll(".section-title");

  function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    sectionTitles.forEach(title => {
      const titleTop = title.getBoundingClientRect().top;

      if (titleTop < triggerBottom) {
        title.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();


  /* ================= CONTACT FORM ================= */

  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  if (form) {

    const nameInput = document.getElementById("name");

    if (nameInput) {
      nameInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^A-Za-z\s]/g, "");
      });
    }

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const message = document.getElementById("message").value.trim();

      const nameRegex = /^[A-Za-z\s]+$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[6-9]\d{9}$/;

      if (!nameRegex.test(name)) {
        return showMessage("Full Name should contain only letters.");
      }

      if (!emailRegex.test(email)) {
        return showMessage("Please enter a valid email address.");
      }

      if (!phoneRegex.test(phone)) {
        return showMessage("Enter valid 10-digit Indian phone number.");
      }

      if (!message) {
        return showMessage("Message cannot be empty.");
      }

      try {

        const response = await fetch("/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, email, phone, message })
        });

        const data = await response.json(); // ✅ Always read response

        if (response.ok) {
          showMessage(data.message || "✅ Your message has been sent successfully!", true);
          form.reset();
        } else {
          showMessage(data.message || "❌ Something went wrong!");
        }

      } catch (error) {
        console.error("Fetch Error:", error);
        showMessage("❌ Server not responding. Please try again.");
      }
    });
  }

  function showMessage(msg, isSuccess = false) {
    if (!successMessage) return;

    successMessage.innerText = msg;
    successMessage.style.display = "block";
    successMessage.style.padding = "10px";
    successMessage.style.borderRadius = "6px";
    successMessage.style.fontWeight = "bold";

    if (isSuccess) {
      successMessage.style.color = "#14b8a6";
    } else {
      successMessage.style.color = "red";
    }

    setTimeout(() => {
      successMessage.style.display = "none";
    }, 3000);
  }


  /* ================= DARK / LIGHT MODE ================= */

  const toggleBtn = document.getElementById("themeToggle");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      toggleBtn.textContent =
        document.body.classList.contains("light-mode") ? "☀️" : "🌙";
    });
  }


  /* ================= EDUCATION SLIDER ================= */

  const educationData = [
    {
      img: "assets/Btech.png",
      title: "Aditya College Of Engineering and Technology",
      desc: "2023 - 2027<br>Currently pursuing B.Tech in Computer Science with CGPA 9.1"
    },
    {
      img: "assets/12th.png",
      title: "A.N College, Patna",
      desc: "2019 - 2021<br>Higher Secondary Education - 76.2%"
    },
    {
      img: "assets/10th.png",
      title: "CPS Koilara Dawan Arrah (Bhojpur)",
      desc: "2018 - 2019<br>Secondary School Education - 88.19%"
    }
  ];

  let eduIndex = 0;

  function updateEdu() {
    const img = document.getElementById("eduImg");
    const title = document.getElementById("eduTitle");
    const desc = document.getElementById("eduDesc");

    if (!img || !title || !desc) return;

    img.src = educationData[eduIndex].img;
    title.textContent = educationData[eduIndex].title;
    desc.innerHTML = educationData[eduIndex].desc;
  }

  window.nextEdu = function () {
    eduIndex = (eduIndex + 1) % educationData.length;
    updateEdu();
  };

  window.prevEdu = function () {
    eduIndex = (eduIndex - 1 + educationData.length) % educationData.length;
    updateEdu();
  };

  updateEdu();

});