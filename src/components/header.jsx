import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const destinations = [
  {
    url: "/img/back.jpg",
    title: "Welcome to MEPTEQ Engineering and Consultancy",
    description:
      "HVAC, Plumbing, Electrical Systems, Fire Protection, Mechanical Services, Building Solutions, MEP Engineering.",
    accentColor: "#0077be",
    gradient: "linear-gradient(135deg,rgb(252, 248, 39),#27ae60)",
    achievements: [
      "Multi-National Project Experience",
      // "Cross-Continental Capabilities",
      "Strategic Global Partnerships",
    ],
  },
  {
    url: "/img/b.jpg",
    title: "Welcome to MEPTEQ Engineering and Consultancy",
    description:
      "HVAC, Plumbing, Electrical Systems, Fire Protection, Mechanical Services, Building Solutions, MEP Engineering.",
    accentColor: "#2ecc71",
    gradient: "linear-gradient(135deg, #2ecc71, #27ae60)",
    achievements: [
      "Global Engineering Excellence",
      "Advanced Technology Integration",
    ],
  },
  {
    url: "/img/africa.jpg",
    title: "Welcome to MEPTEQ Engineering and Consultancy",
    description:
      "HVAC, Plumbing, Electrical Systems, Fire Protection, Mechanical Services, Building Solutions, MEP Engineering.",
    accentColor: "#e74c3c",
    gradient: "linear-gradient(135deg, #e74c3c, #c0392b)",
    achievements: [
      "Eco-Friendly Building Solutions",
      "Intelligent Infrastructure Solutions",
      "Environmental Impact Innovation",
    ],
  },
];

export const Header = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isLoaded, setIsLoaded] = useState(
    Array(destinations.length).fill(false)
  );
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  // Preload images for smoother transitions
  const imageCache = useRef(new Map());

  // Progress timer reference
  const progressTimerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Enhanced touch handling with better sensitivity
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (isNavigating) return;

    const touchDiff = touchStart - touchEnd;
    const minSwipeDistance = 40; // Slightly reduced to improve responsiveness

    if (touchDiff > minSwipeDistance) {
      handleNavigation(() => nextSlide());
    } else if (touchDiff < -minSwipeDistance) {
      handleNavigation(() => prevSlide());
    } else {
      setIsPaused(false);
    }
  };

  const handleNavigation = (navigateFunction) => {
    setIsNavigating(true);
    navigateFunction();

    // Reset progress
    setProgress(0);

    // Reset navigation lock after animation completes
    setTimeout(() => {
      setIsNavigating(false);
      setIsPaused(false);
    }, 500);
  };

  // Improved responsive detection with debouncing
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    checkScreenSize();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkScreenSize, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Preload all images for smoother transitions
  useEffect(() => {
    destinations.forEach((destination, index) => {
      if (!imageCache.current.has(destination.url)) {
        const img = new Image();
        img.src = destination.url;
        img.onload = () => {
          imageCache.current.set(destination.url, true);
          setIsLoaded((prev) => {
            const newLoaded = [...prev];
            newLoaded[index] = true;
            return newLoaded;
          });
        };
      } else {
        setIsLoaded((prev) => {
          const newLoaded = [...prev];
          newLoaded[index] = true;
          return newLoaded;
        });
      }
    });
  }, []);

  // Improved slide navigation with animation lock
  const goToSlide = useCallback(
    (index, dir) => {
      if (isNavigating) return;
      setIsNavigating(true);
      setDirection(dir);
      setCurrent(index);

      // Reset progress
      setProgress(0);

      setTimeout(() => setIsNavigating(false), 500);
    },
    [isNavigating]
  );

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % destinations.length, 1);
  }, [current, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(current === 0 ? destinations.length - 1 : current - 1, -1);
  }, [current, goToSlide]);

  // Keyboard navigation with improved accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleNavigation(() => nextSlide());
      if (e.key === "ArrowLeft") handleNavigation(() => prevSlide());
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Animated progress bar
  useEffect(() => {
    if (isPaused) {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
      return;
    }

    // Clear existing timer
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
    }

    // Start from current progress
    let currentProgress = progress;
    const step = 100 / (8000 / 50); // Calculate step for 50ms intervals

    progressTimerRef.current = setInterval(() => {
      currentProgress += step;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(progressTimerRef.current);
        nextSlide();
        setProgress(0);
      }
    }, 50);

    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [isPaused, nextSlide, progress]);

  // Enhanced slide transitions with spring physics
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.92,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1.2,
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    }),
  };

  // Background shadow effects for depth
  const overlayGradient = `linear-gradient(to bottom, 
    rgba(0,0,0,0.6) 0%, 
    rgba(0,0,0,0.4) 40%, 
    rgba(0,0,0,0.5) 70%, 
    rgba(0,0,0,0.7) 100%)`;

  // Get responsive spacing
  const getResponsivePadding = () => {
    if (screenSize.isMobile) return "0.75rem";
    if (screenSize.isTablet) return "2rem";
    return "4rem";
  };

  // Enhanced arrow button component with hover effects
  const ArrowButton = ({ direction, onClick }) => (
    <motion.button
      onClick={(e) => {
        e.stopPropagation();
        handleNavigation(onClick);
      }}
      whileHover={{ scale: 1.1, opacity: 0.9 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ duration: 0.2 }}
      aria-label={direction === "left" ? "Previous slide" : "Next slide"}
      style={{
        position: "absolute",
        top: "50%",
        [direction === "left" ? "left" : "right"]: screenSize.isMobile
          ? "0.75rem"
          : "1.5rem",
        transform: "translateY(-50%)",
        background: `${destinations[current].accentColor}cc`,
        color: "white",
        width: screenSize.isMobile ? "3rem" : "3.5rem",
        height: screenSize.isMobile ? "3rem" : "3.5rem",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        border: "2px solid rgba(255,255,255,0.3)",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        zIndex: 5,
        fontSize: screenSize.isMobile ? "1.5rem" : "1.75rem",
        fontWeight: "bold",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {direction === "left" ? "‹" : "›"}
    </motion.button>
  );

  // Calculate if any images are still loading
  const isAnyImageLoading = !isLoaded[current];

  return (
    <div
      style={{
        height: "100dvh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, rgba(0,0,0,0.95), rgba(0,0,0,0.75))",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Hero image carousel"
    >
      {/* Background loading state */}
      {isAnyImageLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: `3px solid ${destinations[current].accentColor}`,
              borderTopColor: "transparent",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
      )}

      {/* Background image with enhanced effects */}
      {destinations.map((destination, idx) => (
        <div
          key={`bg-${idx}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `${overlayGradient}, url(${destination.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(1.2) contrast(0.9) saturate(1.15)", // Increased brightness, reduced contrast
            opacity: current === idx ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            zIndex: current === idx ? 1 : 0,
          }}
        />
      ))}

      {/* Floating particles effect for visual interest */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 50%),
                           radial-gradient(circle at 80% 30%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 50%)`,
          pointerEvents: "none",
        }}
      />

      {/* Navigation arrows with smooth transitions */}
      <AnimatePresence>
        {!screenSize.isMobile && (
          <>
            <ArrowButton direction="left" onClick={prevSlide} />
            <ArrowButton direction="right" onClick={nextSlide} />
          </>
        )}
      </AnimatePresence>

      {/* Content container with improved animations */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          color: "white",
          textAlign: "center",
          padding: getResponsivePadding(),
          width: "100%",
          maxWidth: "100vw",
          overflow: "hidden",
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              width: "100%",
              maxWidth: "1200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Title with enhanced gradient and shadow effects */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              style={{ width: "100%" }}
            >
              <h1
                style={{
                  fontSize: screenSize.isMobile
                    ? "clamp(1.7rem, 6vw, 2.7rem)"
                    : "clamp(2.2rem, 5vw, 4.2rem)",
                  fontWeight: 800,
                  textShadow:
                    "0 4px 20px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.3)",
                  background: destinations[current].gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "0.5rem",
                  lineHeight: 1.2,
                  padding: "0 0.5rem",
                  maxWidth: "100%",
                  letterSpacing: "-0.02em",
                }}
              >
                {destinations[current].title}
              </h1>
            </motion.div>

            {/* Description with enhanced readability */}
            <motion.div
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              style={{ width: "100%" }}
            >
              <p
                style={{
                  fontSize: screenSize.isMobile
                    ? "clamp(0.95rem, 3vw, 1.2rem)"
                    : "clamp(1.1rem, 2.5vw, 1.6rem)",
                  fontWeight: 400,
                  color: "#f0f0f0",
                  margin: screenSize.isMobile ? "0.85rem 0" : "1.1rem 0",
                  maxWidth: "800px",
                  lineHeight: 1.6,
                  padding: "0 0.5rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                  textShadow: "0 2px 6px rgba(0,0,0,0.3)",
                  letterSpacing: "0.01em",
                }}
              >
                {destinations[current].description}
              </p>
            </motion.div>

            {/* Achievements with enhanced visual appeal */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              style={{ width: "100%" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: screenSize.isMobile ? "column" : "row",
                  flexWrap: screenSize.isTablet ? "wrap" : "nowrap",
                  justifyContent: "center",
                  gap: screenSize.isMobile ? "0.6rem" : "0.9rem",
                  margin: screenSize.isMobile ? "1.2rem 0" : "1.7rem 0",
                  padding: "0 0.5rem",
                  width: "100%",
                  maxWidth: "100%",
                }}
              >
                {destinations[current].achievements.map(
                  (achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                        backgroundColor: `${destinations[current].accentColor}55`,
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: `${destinations[current].accentColor}33`,
                        padding: screenSize.isMobile
                          ? "0.5rem 0.85rem"
                          : "0.6rem 1.1rem",
                        borderRadius: "0.6rem",
                        boxShadow: "0 6px 14px rgba(0,0,0,0.2)",
                        width: screenSize.isMobile
                          ? "100%"
                          : screenSize.isTablet
                          ? "calc(50% - 0.5rem)"
                          : "auto",
                        minWidth: screenSize.isDesktop ? "max-content" : "auto",
                        border: `1px solid ${destinations[current].accentColor}44`,
                        backdropFilter: "blur(4px)",
                        WebkitBackdropFilter: "blur(4px)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <p
                        style={{
                          color: "white",
                          fontWeight: 600,
                          fontSize: screenSize.isMobile ? "0.9rem" : "1.05rem",
                          textAlign: "center",
                          margin: 0,
                          textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        }}
                      >
                        {achievement}
                      </p>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>

            {/* Call-to-action buttons with enhanced interaction */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
              style={{ width: screenSize.isMobile ? "100%" : "auto" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: screenSize.isMobile ? "column" : "row",
                  justifyContent: "center",
                  gap: screenSize.isMobile ? "0.85rem" : "1.1rem",
                  width: "100%",
                  padding: "0 0.5rem",
                  marginTop: "0.8rem",
                }}
              >
                <motion.button
                  onClick={() => (window.location.href = "#hvac")}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: destinations[current].gradient,
                    color: "white",
                    padding: screenSize.isMobile
                      ? "0.8rem 1.7rem"
                      : "0.85rem 2.2rem",
                    borderRadius: "2rem",
                    fontWeight: 700,
                    fontSize: screenSize.isMobile ? "0.95rem" : "1.05rem",
                    boxShadow: "0 8px 18px rgba(0,0,0,0.25)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    width: screenSize.isMobile ? "100%" : "auto",
                    minWidth: screenSize.isTablet ? "160px" : "auto",
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                  }}
                >
                  Explore Services
                </motion.button>
                <motion.button
                  onClick={() => (window.location.href = "#contact")}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.15)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    border: "2px solid white",
                    color: "white",
                    padding: screenSize.isMobile
                      ? "0.8rem 1.7rem"
                      : "0.85rem 2.2rem",
                    borderRadius: "2rem",
                    fontWeight: 700,
                    fontSize: screenSize.isMobile ? "0.95rem" : "1.05rem",
                    background: "rgba(255,255,255,0.1)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    width: screenSize.isMobile ? "100%" : "auto",
                    minWidth: screenSize.isTablet ? "160px" : "auto",
                    backdropFilter: "blur(5px)",
                    WebkitBackdropFilter: "blur(5px)",
                    boxShadow: "0 8px 15px rgba(0,0,0,0.15)",
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                  }}
                >
                  Contact Us
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Enhanced pagination indicators with active feedback */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{
          position: "absolute",
          bottom: screenSize.isMobile ? "1rem" : "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.6rem",
          zIndex: 4,
          backgroundColor: "rgba(0,0,0,0.4)",
          padding: "0.6rem 0.9rem",
          borderRadius: "1.2rem",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {destinations.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index, index > current ? 1 : -1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={current === index ? "true" : "false"}
            style={{
              width:
                current === index
                  ? screenSize.isMobile
                    ? "1.8rem"
                    : "2.2rem"
                  : screenSize.isMobile
                  ? "0.8rem"
                  : "0.85rem",
              height: screenSize.isMobile ? "0.45rem" : "0.4rem",
              backgroundColor:
                current === index
                  ? destinations[current].accentColor
                  : "rgba(255,255,255,0.5)",
              borderRadius: "0.25rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
              border:
                current === index
                  ? `1px solid ${destinations[current].accentColor}`
                  : "none",
              boxShadow:
                current === index
                  ? `0 0 10px ${destinations[current].accentColor}88`
                  : "none",
            }}
          />
        ))}
      </motion.div>

      {/* Animated progress indicator */}
      {!isPaused && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "4px",
            backgroundColor: destinations[current].accentColor,
            width: `${progress}%`,
            zIndex: 4,
            transition: "width 0.05s linear",
            boxShadow: `0 0 8px ${destinations[current].accentColor}`,
          }}
        />
      )}

      {/* Skip to content for improved accessibility */}
      <a
        href="#main-content"
        style={{
          position: "absolute",
          top: "-100px",
          left: 0,
          zIndex: 10,
          backgroundColor: "#000",
          color: "#fff",
          padding: "0.5rem 1rem",
          transition: "top 0.3s",
          "&:focus": {
            top: 0,
          },
        }}
      >
        Skip to main content
      </a>

      {/* Add global keyframe for spinner */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Header;
