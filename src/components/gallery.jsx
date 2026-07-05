import { Image } from "./image";
import React, { useEffect, useState, useRef } from "react";

export const Gallery = (props) => {
  const [animated, setAnimated] = useState(false);
  const [isLoading, setIsLoading] = useState(!props.data);
  const [filter, setFilter] = useState("all");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);

  // Set categories for filtering based on available data
  const categories = props.data
    ? [
        "all",
        ...new Set(props.data.map((item) => item.category).filter(Boolean)),
      ]
    : ["all"];

  useEffect(() => {
    // Update loading state when data changes
    setIsLoading(!props.data);

    // Use Intersection Observer to detect when the gallery section is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [props.data]);

  // Filter projects based on selected category
  const filteredProjects = props.data
    ? filter === "all"
      ? props.data
      : props.data.filter((item) => item.category === filter)
    : [];

  // Modern, clean, and attractive styles
  const styles = {
    sectionWrapper: {
      position: "relative",
      minHeight: "100vh",
      background: `
        linear-gradient(135deg, 
          #1e1e2e 0%, 
          #2a2a3e 25%, 
          #1a1a2e 50%, 
          #16213e 75%, 
          #0f0f1a 100%
        )
      `,
      paddingTop: "100px",
      paddingBottom: "100px",
      overflow: "hidden",
    },
    decorativeGrid: {
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      backgroundImage: `
        linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
      `,
      backgroundSize: "50px 50px",
      animation: "gridMove 20s linear infinite",
      pointerEvents: "none",
    },
    glowOrb: {
      position: "absolute",
      top: "20%",
      right: "10%",
      width: "300px",
      height: "300px",
      background: "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
      borderRadius: "50%",
      filter: "blur(60px)",
      animation: "float 6s ease-in-out infinite",
      pointerEvents: "none",
    },
    glowOrb2: {
      position: "absolute",
      bottom: "20%",
      left: "5%",
      width: "250px",
      height: "250px",
      background: "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)",
      borderRadius: "50%",
      filter: "blur(60px)",
      animation: "float 8s ease-in-out infinite reverse",
      pointerEvents: "none",
    },
    container: {
      padding: "0 24px",
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative",
      zIndex: 2,
    },
    sectionTitle: {
      opacity: animated ? 1 : 0,
      transform: animated ? "translateY(0)" : "translateY(40px)",
      transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
      marginBottom: "80px",
      textAlign: "center",
    },
    title: {
      fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
      fontWeight: "800",
      color: "#ffffff",
      marginBottom: "24px",
      letterSpacing: "-0.025em",
      lineHeight: "1.1",
      position: "relative",
      display: "inline-block",
    },
    titleAccent: {
      background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      backgroundSize: "200% 200%",
      animation: "gradientShift 4s ease infinite",
    },
    subtitle: {
      fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
      color: "#94a3b8",
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: "1.6",
      fontWeight: "400",
    },
    filterContainer: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "16px",
      marginBottom: "80px",
      opacity: animated ? 1 : 0,
      transform: animated ? "translateY(0)" : "translateY(30px)",
      transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
      transitionDelay: "0.3s",
    },
    filterButton: (active) => ({
      padding: "12px 28px",
      backgroundColor: active ? "#3b82f6" : "rgba(255, 255, 255, 0.05)",
      color: active ? "#ffffff" : "#94a3b8",
      border: active ? "1px solid #3b82f6" : "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "50px",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      fontWeight: "500",
      fontSize: "0.95rem",
      letterSpacing: "0.5px",
      textTransform: "capitalize",
      backdropFilter: "blur(10px)",
      position: "relative",
      overflow: "hidden",
    }),
    portfolioItems: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: "32px",
      padding: "0",
    },
    portfolioItem: (index) => ({
      opacity: animated ? 1 : 0,
      transform: animated ? "translateY(0)" : "translateY(60px)",
      transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      transitionDelay: `${0.1 + (index % 6) * 0.1}s`,
    }),
    portfolioItemInner: (index) => ({
      position: "relative",
      borderRadius: "24px",
      overflow: "hidden",
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(20px)",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      cursor: "pointer",
      height: "100%",
      transform: hoveredIndex === index ? "translateY(-8px)" : "translateY(0)",
      boxShadow: hoveredIndex === index 
        ? "0 32px 64px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.3)"
        : "0 8px 32px rgba(0, 0, 0, 0.2)",
    }),
    itemGlow: (index) => ({
      position: "absolute",
      top: "-2px",
      left: "-2px",
      right: "-2px",
      bottom: "-2px",
      background: hoveredIndex === index 
        ? "linear-gradient(135deg, #3b82f6, #8b5cf6)" 
        : "transparent",
      borderRadius: "24px",
      opacity: hoveredIndex === index ? 1 : 0,
      transition: "all 0.4s ease",
      zIndex: -1,
      filter: "blur(8px)",
    }),
    loadingContainer: {
      padding: "120px 0",
      textAlign: "center",
      width: "100%",
      gridColumn: "1 / -1",
    },
    loadingText: {
      fontSize: "1.2rem",
      color: "#94a3b8",
      marginBottom: "32px",
      fontWeight: "500",
    },
    loadingAnimation: {
      display: "inline-flex",
      gap: "8px",
      alignItems: "center",
    },
    loadingDot: (index) => ({
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
      animation: "bounce 1.4s ease-in-out infinite",
      animationDelay: `${index * 0.16}s`,
    }),
    noResults: {
      textAlign: "center",
      padding: "80px 40px",
      width: "100%",
      gridColumn: "1 / -1",
      backgroundColor: "rgba(255, 255, 255, 0.02)",
      border: "1px dashed rgba(255, 255, 255, 0.1)",
      borderRadius: "24px",
      backdropFilter: "blur(20px)",
    },
    noResultsIcon: {
      fontSize: "3rem",
      marginBottom: "16px",
      opacity: "0.6",
    },
    noResultsText: {
      fontSize: "1.2rem",
      color: "#e2e8f0",
      fontWeight: "600",
      marginBottom: "8px",
    },
    noResultsSubtext: {
      fontSize: "1rem",
      color: "#94a3b8",
    },
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleFilterButtonHover = (e, active) => {
    if (!active) {
      e.target.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
      e.target.style.borderColor = "rgba(59, 130, 246, 0.3)";
      e.target.style.color = "#3b82f6";
      e.target.style.transform = "translateY(-2px)";
    }
  };

  const handleFilterButtonLeave = (e, active) => {
    if (!active) {
      e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
      e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
      e.target.style.color = "#94a3b8";
      e.target.style.transform = "translateY(0)";
    }
  };

  // Add CSS animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      
      @keyframes gridMove {
        0% { transform: translate(0, 0); }
        100% { transform: translate(50px, 50px); }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      
      @keyframes bounce {
        0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
        40% { transform: scale(1.2); opacity: 1; }
      }
      
      @media (max-width: 768px) {
        .portfolio-grid {
          grid-template-columns: 1fr;
          gap: 24px;
        }
        
        .filter-container {
          gap: 12px;
          margin-bottom: 60px;
        }
        
        .filter-button {
          padding: 10px 20px;
          font-size: 0.9rem;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div id="portfolio" ref={sectionRef} style={styles.sectionWrapper}>
      {/* Background decorations */}
      <div style={styles.decorativeGrid} />
      <div style={styles.glowOrb} />
      <div style={styles.glowOrb2} />
      
      <div style={styles.container}>
        <div style={styles.sectionTitle}>
          <h2 style={styles.title}>
            Our <span style={styles.titleAccent}>Projects</span>
          </h2>
          <p style={styles.subtitle}>
            23 Years International MEP Expertise – Associated with more than 500 exceptional projects
          </p>
        </div>

        {/* Filter buttons */}
        {categories.length > 1 && (
          <div style={styles.filterContainer} className="filter-container">
            {categories.map((cat) => (
              <button
                key={cat}
                style={styles.filterButton(filter === cat)}
                onClick={() => setFilter(cat)}
                onMouseEnter={(e) => handleFilterButtonHover(e, filter === cat)}
                onMouseLeave={(e) => handleFilterButtonLeave(e, filter === cat)}
                aria-pressed={filter === cat}
                aria-label={`Filter by ${cat}`}
                className="filter-button"
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        )}

        <div style={styles.portfolioItems} className="portfolio-grid">
          {isLoading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.loadingText}>Loading amazing projects...</div>
              <div style={styles.loadingAnimation} role="status" aria-label="Loading projects">
                {[0, 1, 2].map((i) => (
                  <div key={i} style={styles.loadingDot(i)} />
                ))}
              </div>
            </div>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((d, i) => (
              <div key={`${d.title}-${i}`} style={styles.portfolioItem(i)}>
                <div
                  style={styles.portfolioItemInner(i)}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                  tabIndex="0"
                  role="button"
                  aria-label={`View project: ${d.title}`}
                >
                  <div style={styles.itemGlow(i)} />
                  <Image
                    title={d.title}
                    largeImage={d.largeImage}
                    smallImage={d.smallImage}
                  />
                </div>
              </div>
            ))
          ) : (
            <div style={styles.noResults}>
              <div style={styles.noResultsIcon}>🎨</div>
              <div style={styles.noResultsText}>
                No projects found
              </div>
              <div style={styles.noResultsSubtext}>
                Try selecting a different category
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};