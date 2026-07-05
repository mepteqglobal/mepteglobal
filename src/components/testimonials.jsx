import React, { useState, useEffect, useRef } from "react";

export const Testimonials = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: "50px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Mouse tracking for interactive effects
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Dynamic gradient combinations
  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  ];

  const styles = {
    sectionWrapper: {
      position: "relative",
      padding: "120px 0",
      background: `
        linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f0f23 100%)
      `,
      overflow: "hidden",
      minHeight: "100vh",
    },
    backgroundElements: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: "none",
      zIndex: 1,
    },
    floatingOrb: (index) => ({
      position: "absolute",
      borderRadius: "50%",
      background: `radial-gradient(circle, ${gradients[index]?.split('(')[1]?.split(')')[0] || 'rgba(102, 126, 234, 0.2)'} 0%, transparent 70%)`,
      filter: "blur(60px)",
      animation: `float${index} ${6 + index * 2}s ease-in-out infinite`,
      transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
      transition: "transform 3s ease-out",
    }),
    particles: {
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundImage: `
        radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.1), transparent),
        radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.1), transparent),
        radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.1), transparent),
        radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.1), transparent),
        radial-gradient(2px 2px at 160px 30px, rgba(255,255,255,0.1), transparent)
      `,
      backgroundRepeat: "repeat",
      backgroundSize: "200px 100px",
      animation: "particleMove 20s linear infinite",
    },
    container: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "0 24px",
      position: "relative",
      zIndex: 2,
    },
    sectionTitle: {
      textAlign: "center",
      marginBottom: "80px",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.9)",
      transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
    },
    title: {
      fontSize: "clamp(2.5rem, 6vw, 4rem)",
      fontWeight: "800",
      background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "24px",
      letterSpacing: "-0.02em",
      lineHeight: "1.1",
      position: "relative",
    },
    titleGlow: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "120%",
      height: "120%",
      background: "radial-gradient(ellipse, rgba(102, 126, 234, 0.3) 0%, transparent 70%)",
      filter: "blur(30px)",
      zIndex: -1,
      animation: "pulse 4s ease-in-out infinite",
    },
    subtitle: {
      fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
      color: "#94a3b8",
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: "1.6",
      fontWeight: "400",
    },
    testiGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "40px",
      padding: "0",
    },
    testiItem: (index) => ({
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(80px)",
      transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      transitionDelay: `${0.2 + (index % 8) * 0.1}s`,
    }),
    testiCard: (index) => ({
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      borderRadius: "24px",
      padding: "32px",
      height: "140px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      transform: hoveredIndex === index 
        ? "translateY(-8px) scale(1.05)" 
        : "translateY(0) scale(1)",
      boxShadow: hoveredIndex === index
        ? "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)"
        : "0 10px 20px rgba(0, 0, 0, 0.1)",
    }),
    cardGlow: (index) => ({
      position: "absolute",
      top: "-2px",
      left: "-2px",
      right: "-2px",
      bottom: "-2px",
      background: hoveredIndex === index ? gradients[index % gradients.length] : "transparent",
      borderRadius: "24px",
      opacity: hoveredIndex === index ? 0.4 : 0,
      transition: "all 0.3s ease",
      zIndex: -1,
      filter: "blur(15px)",
    }),
    logoContainer: {
      width: "140px",
      height: "140px",
      borderRadius: "16px",
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
      position: "relative",
      overflow: "hidden",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    logoImage: {
      maxWidth: "120%",
      maxHeight: "120%",
      objectFit: "contain",
      filter: "brightness(1.1) contrast(1.1)",
      transition: "all 0.3s ease",
      transform: hoveredIndex ? "scale(1.1)" : "scale(1)",
    },
    loadingContainer: {
      gridColumn: "1 / -1",
      textAlign: "center",
      padding: "80px 40px",
      background: "rgba(255, 255, 255, 0.03)",
      backdropFilter: "blur(20px)",
      borderRadius: "32px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    loadingText: {
      fontSize: "1.3rem",
      color: "#94a3b8",
      marginBottom: "32px",
      fontWeight: "500",
    },
    loadingDots: {
      display: "flex",
      justifyContent: "center",
      gap: "12px",
    },
    loadingDot: (index) => ({
      width: "14px",
      height: "14px",
      borderRadius: "50%",
      background: gradients[index % gradients.length],
      animation: "bounce 1.5s ease-in-out infinite",
      animationDelay: `${index * 0.2}s`,
    }),
  };

  // Floating orbs data
  const orbs = [
    { size: 200, top: "10%", left: "5%" },
    { size: 150, top: "60%", right: "10%" },
    { size: 180, bottom: "20%", left: "15%" },
    { size: 120, top: "30%", right: "25%" },
    { size: 100, bottom: "40%", right: "5%" },
  ];

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float0 {
        0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
        33% { transform: translate(30px, -30px) rotate(120deg); }
        66% { transform: translate(-20px, 20px) rotate(240deg); }
      }
      
      @keyframes float1 {
        0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
        50% { transform: translate(-40px, -25px) rotate(180deg); }
      }
      
      @keyframes float2 {
        0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
        25% { transform: translate(25px, -35px) rotate(90deg); }
        75% { transform: translate(-30px, 25px) rotate(270deg); }
      }
      
      @keyframes float3 {
        0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
        40% { transform: translate(-20px, -40px) rotate(144deg); }
        80% { transform: translate(35px, 15px) rotate(288deg); }
      }
      
      @keyframes float4 {
        0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
        60% { transform: translate(20px, -20px) rotate(216deg); }
      }
      
      @keyframes particleMove {
        0% { transform: translate(0, 0); }
        100% { transform: translate(-200px, -100px); }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
        50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
      }
      
      @keyframes bounce {
        0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
        40% { transform: scale(1.2); opacity: 1; }
      }
      
      @media (max-width: 768px) {
        .testi-grid {
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
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
    <div id="testimonials" ref={sectionRef} style={styles.sectionWrapper}>
      {/* Background elements */}
      <div style={styles.backgroundElements}>
        <div style={styles.particles} />
        {orbs.map((orb, index) => (
          <div
            key={index}
            style={{
              ...styles.floatingOrb(index),
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              top: orb.top,
              left: orb.left,
              right: orb.right,
              bottom: orb.bottom,
            }}
          />
        ))}
      </div>

      <div style={styles.container}>
        <div style={styles.sectionTitle}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <div style={styles.titleGlow} />
            <h2 style={styles.title}>Our Trusted Partners</h2>
          </div>
          <p style={styles.subtitle}>
            Collaborating with industry leaders to deliver exceptional results
          </p>
        </div>

        <div style={styles.testiGrid} className="testi-grid">
          {props.data ? (
            props.data.map((d, i) => (
              <div
                key={`${d.name}-${i}`}
                style={styles.testiItem(i)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div style={styles.testiCard(i)}>
                  <div style={styles.cardGlow(i)} />
                  
                  {/* Simple logo container */}
                  <div style={styles.logoContainer}>
                    <img
                      src={d.img}
                      alt={`${d.name} logo`}
                      style={styles.logoImage}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.loadingContainer}>
              <div style={styles.loadingText}>
                Loading amazing partners...
              </div>
              <div style={styles.loadingDots}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={styles.loadingDot(i)} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};