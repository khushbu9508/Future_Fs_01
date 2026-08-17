import React, { useEffect } from "react";
import AOS from "aos";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Certification from "./components/Certification";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";  

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <About/>
      <Certification />
      <Projects />
      <Contact />
      <Footer/>
    </>
  );
}

export default App;