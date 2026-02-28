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
        title.classList.add("show");   // ✅ Only add, never remove
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Run once on load


  /* ================= ACADEMIC TYPING EFFECT ================= */

  const academicTexts = [
    "B.Tech in Computer Science - Aditya College Of Engineering and Technology (2023-2027)",
    "Higher Secondary - A.N College, Patna (2019-2021) - 76.2%",
    "Secondary School - CPS Koilara Dawan Arrah (Bhojpur) (2018-2019) - 88.19%",
    "Currently exploring ServiceNow & Full Stack Development"
  ];

  let academicIndex = 0;
  let academicCharIndex = 0;
  let academicDeleting = false;

  const academicElement = document.querySelector(".academic-typing");

  function typeAcademic() {
    if (!academicElement) return;

    const currentText = academicTexts[academicIndex];

    if (!academicDeleting) {
      academicElement.textContent = currentText.substring(0, academicCharIndex + 1);
      academicCharIndex++;

      if (academicCharIndex === currentText.length) {
        academicDeleting = true;
        setTimeout(typeAcademic, 1500);
        return;
      }
    } else {
      academicElement.textContent = currentText.substring(0, academicCharIndex - 1);
      academicCharIndex--;

      if (academicCharIndex === 0) {
        academicDeleting = false;
        academicIndex = (academicIndex + 1) % academicTexts.length;
      }
    }

    setTimeout(typeAcademic, academicDeleting ? 50 : 100);
  }

  typeAcademic();


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
        showMessage("Full Name should contain only letters.");
        return;
      }

      if (!emailRegex.test(email)) {
        showMessage("Please enter a valid email address.");
        return;
      }

      if (!phoneRegex.test(phone)) {
        showMessage("Enter valid 10-digit Indian phone number.");
        return;
      }

      if (!message) {
        showMessage("Message cannot be empty.");
        return;
      }

      try {
        const response = await fetch("/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, email, phone, message })
        });

        const data = await response.json();

        if (response.ok) {
          showMessage(data.message, true);
          form.reset();
        } else {
          showMessage(data.message);
        }

      } catch (error) {
        console.error("Fetch Error:", error);
        showMessage("Server error! Please try again.");
      }
    });
  }

  function showMessage(msg, isSuccess = false) {
    if (!successMessage) return;

    successMessage.innerText = msg;
    successMessage.style.display = "block";
    successMessage.style.color = isSuccess ? "#14b8a6" : "red";

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
      desc: "2023 - 2027\nCurrently pursuing my B.Tech in Computer Science with a CGPA of 9.1"
    },
    {
      img: "assets/12th.png",
      title: "A.N College, Patna",
      desc: "2019 - 2021\nHigher Secondary Education - 76.2%"
    },
    {
      img: "assets/10th.png",
      title: "CPS Koilara Dawan Arrah (Bhojpur)",
      desc: "2018 - 2019\nSecondary School Education - 88.19%"
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
    desc.innerHTML = educationData[eduIndex].desc.replace("\n", "<br>");
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