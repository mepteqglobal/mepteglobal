import React from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
} from "@mui/icons-material";

// Reusable Footer Link
const FooterLink = ({ text }) => (
  <Typography
    variant="body2"
    sx={{
      cursor: "pointer",
      color: "#94a3b8",
      transition: "all 0.2s ease",
      display: "block",
      fontSize: "14px",
      mb: 0.5,
      "&:hover": {
        color: "white",
        transform: "translateX(5px)",
      },
    }}
  >
    {text}
  </Typography>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0f172a",
        color: "#e2e8f0",
        py: 6,
        mt: 10,
        width: "100%",
        minHeight: "350px", // Set minimum height
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "white",
                mb: 3,
                fontSize: { xs: "1.5rem", sm: "1.75rem" },
              }}
            >
              Mepteq
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#94a3b8",
                mb: 3,
                maxWidth: "400px",
                fontSize: "18px",
              }}
            >
              MepTeq specializes in high-quality solutions in HVAC, plumbing,
              electrical systems, and fire protection. We deliver efficient
              design, installation, and maintenance for residential, commercial,
              and industrial projects—ensuring safety and performance.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 900,
                color: "white",
                mb: 4,
              }}
            >
              Quick Links
            </Typography>
            <FooterLink text="About Us" href="/about" />
  <FooterLink text="Services" href="/HVAC" />
  <FooterLink text="Portfolio" href="/gallery" />
  <FooterLink text="Testimonials" href="/testimonials" />
  <FooterLink text="Contact" href="/Contact" />
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "white",
                mb: 3,
              }}
            >
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <IconButton
                size="small"
                sx={{ color: "#3b82f6", "&:hover": { color: "white" } }}
              >
                <FacebookIcon sx={{ fontSize: 28 }} />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: "#3b82f6", "&:hover": { color: "white" } }}
              >
                <TwitterIcon sx={{ fontSize: 28 }} />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: "#3b82f6", "&:hover": { color: "white" } }}
              >
                <LinkedInIcon sx={{ fontSize: 28 }} />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: "#3b82f6", "&:hover": { color: "white" } }}
              >
                <InstagramIcon sx={{ fontSize: 28 }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Divider & Copyright */}
        <Divider sx={{ my: 4, borderColor: "#334155" }} />
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "#64748b", fontSize: "14px" }}
        >
          © {currentYear} Mepteq.com | All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
