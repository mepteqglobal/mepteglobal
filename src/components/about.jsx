import React, { useEffect, useState } from "react";
import abt from "../img/aboutimg.jpg";

export const About = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set up resize listener
    window.addEventListener("resize", handleResize);

    // Set up intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false); // Reset animation when out of view
        }
      },
      { threshold: 0.1 }
    );

    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => {
      if (aboutSection) {
        observer.unobserve(aboutSection);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Responsive adjustments based on window width
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  // Base styles with enhanced responsiveness and attractiveness
  const styles = {
    section: {
      padding: isMobile ? "50px 0" : "80px 0",
      backgroundColor: "#f8fafc", // Lighter background for better contrast
      fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      overflow: "hidden", // Prevent animations from causing horizontal scroll
    },
    container: {
      width: "90%",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    row: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: isMobile ? "30px" : "60px", // Increased spacing between columns
    },
    imageColumn: {
      flex: isMobile ? "1" : "0 0 45%",
      marginBottom: isMobile ? "20px" : "0",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(40px)",
      transition: "opacity 1s ease, transform 1s ease",
    },
    contentColumn: {
      flex: isMobile ? "1" : "0 0 55%",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(40px)",
      transition: "opacity 1s ease, transform 1s ease",
      transitionDelay: "0.3s",
    },
    imageWrapper: {
      position: "relative",
      borderRadius: "50%", // Circular image
      overflow: "hidden",
      width: isMobile ? "280px" : isTablet ? "380px" : "450px",
      height: isMobile ? "280px" : isTablet ? "380px" : "450px",
      margin: "0 auto",
      border: "5px solid #ffffff", // White border around circular image
      background: "linear-gradient(135deg,rgb(218, 221, 230),rgb(230, 227, 241))", // Gradient behind image
      padding: "5px", // Space for the border
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      transition: "transform 0.6s ease",
      borderRadius: "50%", // Making sure the image itself is also circular
    },
    headingWrapper: {
      marginBottom: isMobile ? "20px" : "30px",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
      transitionDelay: "0.4s",
    },
    heading: {
      fontSize: isMobile ? "1.8rem" : isTablet ? "2rem" : "2.2rem",
      fontWeight: "700",
      color: "#2d3748",
      marginBottom: "5px",
      position: "relative",
      paddingBottom: "15px",
    },
    headingUnderline: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: isVisible ? "60px" : "0px",
      height: "3px",
      background: "linear-gradient(to right, #4a6cf7, #6a3ef7)", // Gradient underline
      transition: "width 1s ease",
      transitionDelay: "0.7s",
    },
    paragraph: {
      fontSize: isMobile ? "1.2rem" : "2.2rem",
      lineHeight: 1.8,
      color: "#4a5568",
      marginBottom: isMobile ? "20px" : "30px",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
      transitionDelay: "0.5s",
    },
    listsContainer: {
      display: "flex",
      flexDirection: windowWidth < 576 ? "column" : "row",
      gap: isMobile ? "15px" : "25px",
      marginBottom: isMobile ? "25px" : "35px",
      opacity: isVisible ? 1 : 0,
      transition: "opacity 0.8s ease",
      transitionDelay: "0.6s",
    },
    listColumn: {
      flex: 1,
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    listItem: {
      fontSize: isMobile ? "0.9rem" : "1.4rem",
      color: "#4a5568",
      padding: isMobile ? "8px 0" : "10px 0",
      display: "flex",
      alignItems: "center",
    },
    listIcon: {
      marginRight: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: isMobile ? "22px" : "24px",
      height: isMobile ? "22px" : "24px",
      background: "linear-gradient(135deg,rgb(192, 215, 16),rgb(202, 73, 13))", // Gradient background for icons
      borderRadius: "50%",
      color: "#ffffff",
      fontSize: isMobile ? "10px" : "12px",
    },
    button: {
      background: "linear-gradient(to right,rgb(173, 18, 57),rgb(216, 23, 145))", // Gradient button
      color: "#ffffff",
      border: "none",
      borderRadius: "30px", // Rounded button
      padding: isMobile ? "12px 25px" : "14px 30px",
      fontSize: isMobile ? "0.9rem" : "0.95rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "inline-flex",
      alignItems: "center",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.8s ease, transform 0.8s ease, filter 0.3s ease",
      transitionDelay: "0.7s",
    },
    buttonIcon: {
      marginLeft: "10px",
      transform: "translateX(0)",
      transition: "transform 0.3s ease",
    },
    imageOverlay: {
      position: "absolute",
      top: "5px", // Account for padding
      left: "5px", // Account for padding
      right: "5px", // Account for padding
      bottom: "5px", // Account for padding
      backgroundColor: "rgba(140, 148, 178, 0.2)",
      opacity: 0,
      transition: "opacity 0.3s ease",
      borderRadius: "50%", // Match the circular image
    },
  };

  const handleImageHover = (e) => {
    e.currentTarget.querySelector("img").style.transform = "scale(1.05)";
    if (e.currentTarget.querySelector(".image-overlay")) {
      e.currentTarget.querySelector(".image-overlay").style.opacity = "1";
    }
  };

  const handleImageLeave = (e) => {
    e.currentTarget.querySelector("img").style.transform = "scale(1)";
    if (e.currentTarget.querySelector(".image-overlay")) {
      e.currentTarget.querySelector(".image-overlay").style.opacity = "0";
    }
  };

  const handleButtonHover = (e) => {
    e.target.style.filter = "brightness(1.1)";
    if (e.target.querySelector(".button-icon")) {
      e.target.querySelector(".button-icon").style.transform =
        "translateX(5px)";
    }
  };

  const handleButtonLeave = (e) => {
    e.target.style.filter = "brightness(1)";
    if (e.target.querySelector(".button-icon")) {
      e.target.querySelector(".button-icon").style.transform = "translateX(0)";
    }
  };

  return (
    <section id="about" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.row}>
          <div style={styles.imageColumn}>
            <div
              style={styles.imageWrapper}
              onMouseEnter={handleImageHover}
              onMouseLeave={handleImageLeave}
            >
              <img src={abt} alt="About Our Company" style={styles.image} />
              <div className="image-overlay" style={styles.imageOverlay}></div>
            </div>
          </div>

          <div style={styles.contentColumn}>
            <div style={styles.headingWrapper}>
              <h2 style={styles.heading}>
                About Us
                <span style={styles.headingUnderline}></span>
              </h2>
            </div>

            <p style={styles.paragraph}>
              {props.data ? props.data.paragraph : "Loading..."}
            </p>

            <div style={styles.listsContainer}>
              <div style={styles.listColumn}>
                <ul style={styles.list}>
                  {props.data
                    ? props.data.Why.map((d, i) => (
                        <li
                          key={`why-${i}`}
                          style={{
                            ...styles.listItem,
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible
                              ? "translateY(0)"
                              : "translateY(15px)",
                            transition:
                              "opacity 0.5s ease, transform 0.5s ease",
                            transitionDelay: `${0.6 + i * 0.1}s`,
                          }}
                        >
                          <span style={styles.listIcon}>✓</span>
                          {d}
                        </li>
                      ))
                    : "Loading..."}
                </ul>
              </div>

              <div style={styles.listColumn}>
                <ul style={styles.list}>
                  {props.data
                    ? props.data.Why2.map((d, i) => (
                        <li
                          key={`why2-${i}`}
                          style={{
                            ...styles.listItem,
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible
                              ? "translateY(0)"
                              : "translateY(15px)",
                            transition:
                              "opacity 0.5s ease, transform 0.5s ease",
                            transitionDelay: `${0.6 + i * 0.1}s`,
                          }}
                        >
                          <span style={styles.listIcon}>✓</span>
                          {d}
                        </li>
                      ))
                    : "Loading..."}
                </ul>
              </div>
            </div>

            <button
              style={styles.button}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              Learn More 
             

              <span className="button-icon" style={styles.buttonIcon}>
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
