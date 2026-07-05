import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  Box,
  Hidden,
  Divider,
  Collapse,
  useScrollTrigger,
  styled,
  alpha,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import WorkIcon from "@mui/icons-material/Work";

import { keyframes } from "@emotion/react";

// Logo import
import logo from "../img/log1.jpg";

// More subtle gradient animation
const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Pulse animation for active items
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.2);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(25, 118, 210, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
  }
`;

// Custom styled components
const StyledAppBar = styled(AppBar)(({ theme, trigger }) => ({
  transition: "all 0.3s ease",
  boxShadow: trigger ? "0 4px 20px rgba(0, 0, 0, 0.08)" : "none",
  backgroundColor: "white",
  borderBottom: trigger
    ? "none"
    : `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
}));

const StyledToolbar = styled(Toolbar)(({ theme, trigger }) => ({
  minHeight: trigger ? 64 : 80,
  transition: "min-height 0.3s ease",
  padding: theme.spacing(0, 2),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(0, 3),
  },
}));

const Logo = styled("img")(({ theme, trigger }) => ({
  height: trigger ? 45 : 52,
  transition: "height 0.3s ease",
  filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08))",
}));

// Enhanced NavButton for more attractive look
const NavButton = styled(Button)(({ theme, active }) => ({
  margin: theme.spacing(0, 0.8),
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  fontWeight: 600,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2.2),
  textTransform: "none",
  fontSize: "1.1rem", 
  letterSpacing: "0.3px",
  position: "relative",
  backgroundColor: active
    ? alpha(theme.palette.primary.main, 0.08)
    : "transparent",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 4,
    left: active ? 14 : "50%",
    width: active ? "calc(100% - 28px)" : 0,
    height: 3,
    backgroundColor: theme.palette.primary.main,
    transform: active ? "none" : "translateX(-50%)",
    transition: "all 0.3s ease",
    borderRadius: 4,
    opacity: active ? 0.9 : 0,
  },
  "&:hover::after": {
    width: "calc(100% - 28px)",
    left: 14,
    transform: "none",
    opacity: 0.7,
  },
  ...(active && {
    animation: `${pulse} 2s infinite`,
  }),
}));

const TopBarButton = styled(Button)(({ theme }) => ({
  color: "white",
  fontWeight: 500,
  fontSize: "0.85rem",
  padding: theme.spacing(0.4, 1.2),
  borderRadius: 4,
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: alpha("#ffffff", 0.15),
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: "white",
  padding: theme.spacing(0.6),
  margin: theme.spacing(0, 0.3),
  backgroundColor: alpha("#ffffff", 0.1),
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: alpha("#ffffff", 0.2),
    transform: "translateY(-2px)",
  },
}));

const TopBar = styled(Box)(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
  backgroundSize: "200% 200%",
  animation: `${gradient} 20s ease infinite`,
  padding: theme.spacing(0.8, 0),
  color: "white",
}));

const MobileTopBar = styled(Box)(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
  backgroundSize: "200% 200%",
  animation: `${gradient} 20s ease infinite`,
  padding: theme.spacing(0.8, 0),
  color: "white",
}));

// Enhanced mobile nav item for more attractive look
const MobileNavItem = styled(ListItem)(({ theme, active }) => ({
  borderLeft: active
    ? `4px solid ${theme.palette.primary.main}`
    : "4px solid transparent",
  transition: "all 0.25s ease",
  padding: theme.spacing(1.6, 2),
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.06) : "transparent",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    transform: "translateX(4px)",
  },
}));

const MobileContactButton = styled(Button)(({ theme }) => ({
  borderRadius: 4,
  backgroundColor: alpha("#ffffff", 0.15),
  color: "white",
  padding: theme.spacing(0.5, 1.6),
  fontSize: "0.9rem",
  fontWeight: 500,
  textTransform: "none",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: alpha("#ffffff", 0.25),
    transform: "translateY(-2px)",
  },
}));

const CallNowButton = styled(Button)(({ theme }) => ({
  color: "white",
  fontWeight: 600,
  padding: theme.spacing(0.9, 2.5),
  borderRadius: 6,
  marginLeft: theme.spacing(2),
  background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
  textTransform: "none",
  fontSize: "1.1rem",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 6px 14px rgba(0, 0, 0, 0.2)",
    transform: "translateY(-3px)",
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.main})`,
  },
}));

// Career Button with special styling
const CareerButton = styled(Button)(({ theme, active }) => ({
  margin: theme.spacing(0, 0.8),
  color: active ? "white" : theme.palette.text.primary,
  fontWeight: 700,
  borderRadius: 20,
  padding: theme.spacing(1, 2.5),
  textTransform: "none",
  fontSize: "1.1rem", 
  letterSpacing: "0.3px",
  position: "relative",
  background: active 
    ? `linear-gradient(45deg, #4caf50, #66bb6a)`
    : "transparent",
  border: active ? "none" : `2px solid ${theme.palette.success.main}`,
  transition: "all 0.3s ease",
  "&:hover": {
    background: `linear-gradient(45deg, #4caf50, #66bb6a)`,
    color: "white",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 12px rgba(76, 175, 80, 0.3)",
  },
  "&::before": {
    content: '"🚀"',
    position: "absolute",
    left: -8,
    top: -8,
    fontSize: "1.2rem",
    animation: active ? "bounce 2s infinite" : "none",
  },
}));

export const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.hash || "/");
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  useEffect(() => {
    // Set initial path
    setCurrentPath(window.location.hash || "/");

    // Add listener for hash changes
    const handleHashChange = () => {
      const newPath = window.location.hash || "/";
      setCurrentPath(newPath);
      
      // If navigating to hire page, ensure it's properly handled
      if (newPath === "#Hire" || newPath === "#hire" || newPath === "#career") {
        // Trigger any necessary route handling here
        window.location.hash = "#Hire";
      }
    };

    // Hide/show navbar on scroll
    const controlNavbar = () => {
      if (window.scrollY > 100) {
        if (window.scrollY > lastScrollY && !mobileOpen) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        setLastScrollY(window.scrollY);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("scroll", controlNavbar);

    // Lock body scroll when mobile drawer is open
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [mobileOpen, lastScrollY]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleServicesToggle = () => {
    setServicesOpen(!servicesOpen);
  };

  const handleNavClick = (path, event) => {
    setCurrentPath(path);
    setMobileOpen(false);
    
    // For home page, scroll to top
    if (path === "/") {
      window.location.hash = "";
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // For all hash links, let SmoothScroll handle the scrolling
    // Just update the hash - SmoothScroll will do the rest
    if (path.startsWith("#")) {
      window.location.hash = path;
    }
  };

  // Navigation items - FIXED the typo and improved routing
  const navItems = [
    { name: "Home", link: "/", active: currentPath === "/" },
    { name: "About", link: "#about", active: currentPath === "#about" },
    {
      name: "Projects",
      link: "#Portfolio",
      active: currentPath === "#Portfolio",
    },
    {
      name: "Career", // FIXED: Changed from "Careear" to "Career"
      link: "#Hire",
      active: currentPath === "#Hire" || currentPath === "#hire" || currentPath === "#career",
      special: true, // Mark as special for different styling
    },
    { name: "Services", link: "#HVAC", active: currentPath === "#HVAC" },
    {
      name: "Clients",
      link: "#Testimonials",
      active: currentPath === "#Testimonials",
    },
    { name: "Contact", link: "#Contact", active: currentPath === "#Contact" },
  ];

  const drawer = (
    <Box sx={{ width: 280, height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Logo src={logo} alt="HVAC Pro Logo" sx={{ height: 42, mr: 1 }} />
        </Box>
        <IconButton
          onClick={handleDrawerToggle}
          size="medium"
          sx={{ 
            color: "white",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: alpha("#ffffff", 0.2),
              transform: "rotate(90deg)"
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ pt: 0.5 }}>
        {navItems.map((item) => (
          <React.Fragment key={item.name}>
            <MobileNavItem
              button
              onClick={
                item.name === "Services"
                  ? handleServicesToggle
                  : (e) => handleNavClick(item.link, e)
              }
              active={item.active ? 1 : 0}
              component={item.name !== "Services" ? "a" : "div"}
              href={item.name !== "Services" ? item.link : undefined}
              sx={{
                overflow: "hidden",
                // Special styling for career link
                ...(item.name === "Career" && {
                  background: item.active 
                    ? "linear-gradient(45deg, rgba(76, 175, 80, 0.1), rgba(102, 187, 106, 0.1))"
                    : "transparent",
                  borderLeft: item.active
                    ? "4px solid #4caf50"
                    : "4px solid transparent",
                  "&:hover": {
                    background: "linear-gradient(45deg, rgba(76, 175, 80, 0.1), rgba(102, 187, 106, 0.1))",
                    borderLeft: "4px solid #4caf50",
                  }
                })
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {item.name === "Career" && (
                      <WorkIcon 
                        sx={{ 
                          color: item.active ? "#4caf50" : "text.secondary",
                          fontSize: "1.2rem" 
                        }} 
                      />
                    )}
                    <span>{item.name}</span>
                    {item.name === "Career" && (
                      <Box
                        sx={{
                          background: "linear-gradient(45deg, #4caf50, #66bb6a)",
                          color: "white",
                          fontSize: "0.7rem",
                          padding: "2px 6px",
                          borderRadius: "10px",
                          fontWeight: "bold",
                          animation: "pulse 2s infinite"
                        }}
                      >
                        NEW
                      </Box>
                    )}
                  </Box>
                }
                primaryTypographyProps={{
                  fontWeight: item.active ? 900 : 700,
                  color: item.name === "Career" && item.active ? "#4caf50" : 
                          item.active ? "primary.main" : "text.primary",
                  fontSize: "1.1rem",
                  letterSpacing: "0.3px"
                }}
              />
              {item.name === "Services" &&
                (servicesOpen ? <ExpandLess /> : <ExpandMore />)}
            </MobileNavItem>

            {item.name === "Services" && (
              <Collapse in={servicesOpen} timeout="auto" unmountOnExit>
                <List 
                  component="div" 
                  disablePadding
                  sx={{ 
                    backgroundColor: (theme) => alpha(theme.palette.grey[100], 0.5),
                    borderRadius: "0 0 8px 8px"
                  }}
                >
                  <ListItem
                    button
                    component="a"
                    href="#hvac-service-1"
                    onClick={(e) => handleNavClick("#hvac-service-1", e)}
                    sx={{ 
                      pl: 4, 
                      py: 1.2,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.06),
                        pl: 5,
                      }
                    }}
                  >
                    <ListItemText
                      primary="HVAC Design"
                      primaryTypographyProps={{
                        fontSize: "1rem",
                        fontWeight: 600
                      }}
                    />
                  </ListItem>
                  <ListItem
                    button
                    component="a"
                    href="#hvac-service-2"
                    onClick={(e) => handleNavClick("#hvac-service-2", e)}
                    sx={{ 
                      pl: 4, 
                      py: 1.2,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.06),
                        pl: 5,
                      }
                    }}
                  >
                    <ListItemText
                      primary="Ventilation Systems"
                      primaryTypographyProps={{
                        fontSize: "1rem",
                        fontWeight: 600
                      }}
                    />
                  </ListItem>
                  <ListItem
                    button
                    component="a"
                    href="#hvac-service-3"
                    onClick={(e) => handleNavClick("#hvac-service-3", e)}
                    sx={{ 
                      pl: 4, 
                      py: 1.2,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.06),
                        pl: 5,
                      }
                    }}
                  >
                    <ListItemText
                      primary="Air Conditioning"
                      primaryTypographyProps={{
                        fontSize: "1rem",
                        fontWeight: 600
                      }}
                    />
                  </ListItem>
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>

      <Divider />

      <Box sx={{ p: 3, backgroundColor: (theme) => alpha(theme.palette.grey[100], 0.7) }}>
        <Typography
          variant="subtitle2"
          color="primary"
          sx={{
            mb: 2,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 0.8,
            fontSize: "1rem",
          }}
        >
          Contact Us
        </Typography>

        <Box 
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            mb: 2,
            transition: "all 0.2s ease",
            p: 1,
            borderRadius: 1,
            "&:hover": {
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.06),
              transform: "translateX(4px)"
            }
          }}
        >
          <Box
            sx={{
              backgroundColor: "primary.main",
              borderRadius: "50%",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
              boxShadow: "0 3px 8px rgba(0, 0, 0, 0.12)",
            }}
          >
            <PhoneIcon fontSize="small" sx={{ color: "white" }} />
          </Box>
          <Typography
            variant="body2"
            component="a"
            href="tel:+917798097620"
            sx={{
              color: "text.primary",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            +91-7798097620
          </Typography>
        </Box>

        <Box 
          sx={{ 
            display: "flex", 
            alignItems: "center",
            transition: "all 0.2s ease",
            p: 1,
            borderRadius: 1,
            "&:hover": {
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.06),
              transform: "translateX(4px)"
            }
          }}
        >
          <Box
            sx={{
              backgroundColor: "primary.main",
              borderRadius: "50%",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
              boxShadow: "0 3px 8px rgba(0, 0, 0, 0.12)",
            }}
          >
            <EmailIcon fontSize="small" sx={{ color: "white" }} />
          </Box>
          <Typography
            variant="body2"
            component="a"
            href="mailto:dhake9322@gmail.com"
            sx={{
              color: "text.primary",
              textDecoration: "none",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "190px",
              display: "block",
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            dhake9322@gmail.com
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.08),
        }}
      >
        {[
          FacebookIcon,
          TwitterIcon,
          LinkedInIcon,
          InstagramIcon,
          YouTubeIcon,
        ].map((Icon, index) => (
          <IconButton
            key={index}
            color="primary"
            size="small"
            component="a"
            href="/"
            sx={{
              backgroundColor: "white",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
              width: 36,
              height: 36,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "white",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                transform: "translateY(-3px)",
              },
            }}
          >
            <Icon fontSize="small" />
          </IconButton>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Top Bar with Contact Info and Social Media - Desktop */}
      <Hidden smDown>
        <TopBar>
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TopBarButton
                  startIcon={<PhoneIcon sx={{ fontSize: 18 }} />}
                  href="tel:+917798097620"
                  sx={{ 
                    fontSize: '16px', 
                    textTransform: 'none',
                    borderRadius: 20,
                    pl: 2,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: alpha("#ffffff", 0.15),
                      transform: "translateY(-1px)",
                    }
                  }}
                >
                  +91-7798097620
                </TopBarButton>
                <TopBarButton
                  startIcon={<EmailIcon sx={{ fontSize: 18 }} />}
                  href="mailto:dhake9322@gmail.com"
                  sx={{ 
                    fontSize: '16px', 
                    textTransform: 'none',
                    borderRadius: 20,
                    pl: 2,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: alpha("#ffffff", 0.15),
                      transform: "translateY(-1px)",
                    }
                  }}
                >
                  dhake9322@gmail.com
                </TopBarButton>
              </Box>

              <Box>
                {[
                  FacebookIcon,
                  TwitterIcon,
                  YouTubeIcon,
                  LinkedInIcon,
                  InstagramIcon,
                ].map((Icon, index) => (
                  <SocialIcon
                    key={index}
                    size="small"
                    aria-label="Social Media"
                    href="/"
                  >
                    <Icon sx={{ fontSize: 18 }} />
                  </SocialIcon>
                ))}
              </Box>
            </Box>
          </Container>
        </TopBar>
      </Hidden>

      {/* Mobile Top Bar */}
      <Hidden smUp>
        <MobileTopBar>
          <Container maxWidth="lg" disableGutters>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 2,
                py: 0.8,
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <MobileContactButton
                  startIcon={<PhoneIcon sx={{ fontSize: 16 }} />}
                  href="tel:+917798097620"
                  sx={{ 
                    fontSize: "0.9rem",
                    borderRadius: 20,
                  }}
                >
                  Call Now
                </MobileContactButton>

                <MobileContactButton
                  startIcon={<WhatsAppIcon sx={{ fontSize: 16 }} />}
                  href="https://wa.me/917798097620"
                  sx={{ 
                    fontSize: "0.9rem",
                    borderRadius: 20,
                  }}
                >
                  WhatsApp
                </MobileContactButton>
              </Box>

              <IconButton
                size="small"
                sx={{
                  color: "white",
                  backgroundColor: alpha("#ffffff", 0.15),
                  width: 32,
                  height: 32,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: alpha("#ffffff", 0.25),
                    transform: "rotate(15deg)",
                  },
                }}
                component="a"
                href="mailto:dhake9322@gmail.com"
              >
                <EmailIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          </Container>
        </MobileTopBar>
      </Hidden>

      {/* Main Navigation Bar */}
      <StyledAppBar
        position="sticky"
        trigger={trigger ? 1 : 0}
        elevation={0}
        sx={{
          top: visible ? 0 : -100,
          transition: "top 0.3s ease",
        }}
      >
        <Container maxWidth="lg">
          <StyledToolbar trigger={trigger ? 1 : 0} disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
              <Box
                component="a"
                href="#page-top"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Logo
                  src={logo}
                  alt="HVAC Pro Logo"
                  trigger={trigger ? 1 : 0}
                />
              </Box>
            </Box>

            {/* Desktop Navigation */}
            <Hidden mdDown>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {navItems.map((item) => (
                  item.special ? (
                    <CareerButton
                      key={item.name}
                      component="a"
                      href={item.link}
                      active={item.active ? 1 : 0}
                      onClick={(e) => handleNavClick(item.link, e)}
                      startIcon={<WorkIcon />}
                    >
                      {item.name}
                    </CareerButton>
                  ) : (
                    <NavButton
                      key={item.name}
                      component="a"
                      href={item.link}
                      active={item.active ? 1 : 0}
                      onClick={(e) => handleNavClick(item.link, e)}
                    >
                      {item.name}
                    </NavButton>
                  )
                ))}
                <CallNowButton
                  component="a"
                  href="tel:+917798097620"
                  startIcon={<PhoneIcon />}
                >
                  Call Now
                </CallNowButton>
              </Box>
            </Hidden>

            {/* Mobile Menu Toggle Button */}
            <Hidden mdUp>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  color: "primary.main",
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.08),
                  width: 42,
                  height: 42,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.12),
                    transform: "rotate(180deg)",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          </StyledToolbar>
        </Container>
      </StyledAppBar>

      {/* Mobile Navigation Drawer */}
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 280,
              borderRadius: "12px 0 0 12px",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </Box>
  );
};