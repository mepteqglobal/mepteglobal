import React, { useState, useEffect } from "react";

import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { About } from "./components/about";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import JsonData from "./data/data.json";
// Commenting out SmoothScroll to prevent conflicts with our navigation
// import SmoothScroll from "smooth-scroll";
//import "./App.css";
import { HVAC } from "./components/HVAC";
import { Elv } from "./components/Elv";
import { Plumber } from "./components/Plumber";
import Contact from "./components/contact";
import Footer from "./components/Footer";
import Hire from "./components/Hire";

// Commenting out SmoothScroll initialization to prevent conflicts
// export const scroll = new SmoothScroll('a[href*="#"]', {
//   speed: 1000,
//   speedAsDuration: true,
// });

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />
      
      {/* Header section - acts as home page */}
      <div id="home">
        <Header data={landingPageData.Header} />
      </div>
      
      {/* About section */}
      <div id="about">
        <About data={landingPageData.About} />
      </div>

      {/* Portfolio/Gallery section */}
      <div id="Portfolio">
        <Gallery data={landingPageData.Gallery} />
      </div>
      
      {/* HVAC Services section */}
      <div id="HVAC">
        <HVAC data={landingPageData.HVAC} />
        <Plumber data={landingPageData.Plumber} />
        <Elv data={landingPageData.Elv} />
      </div>
      
      {/* Testimonials/Clients section */}
      <div id="Testimonials">
        <Testimonials data={landingPageData.Testimonials} />
      </div>
      
      {/* Hire/Career section - This is the key fix! */}
      <div id="Hire">
        <Hire data={landingPageData.Hire} />
      </div>
      
      {/* Contact section */}
      <div id="Contact">
        <Contact data={landingPageData.Contact} />
      </div>
      
      <Footer data={landingPageData.Footer} />
    </div>
  );
};

export default App;