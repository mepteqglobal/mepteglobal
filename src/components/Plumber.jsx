import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import { styled, keyframes } from "@mui/material/styles";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import BalconyIcon from "@mui/icons-material/Balcony";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import WaterIcon from "@mui/icons-material/Water";
import SanitizerIcon from "@mui/icons-material/Sanitizer";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { motion } from "framer-motion";
import Fade from "@mui/material/Fade";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

// Custom styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[10],
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[8],
  },
}));

const TitleBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(6),
  '&::after': {
    content: '""',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '-16px',
    width: '80px',
    height: '4px',
    backgroundColor: theme.palette.primary.main,
  },
}));

// Larger icon size
const LargeIcon = styled(Box)(({ theme }) => ({
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
  },
}));


export const Plumber = ({ data, title = "Plumbing & Fire Protection" }) => {
  const services = [
    {
         icon: <WaterDropIcon style={{ color: "#2196f3" }} />,
             text: "Water Supply",
           },
           {
             icon: <PlumbingIcon style={{ color: "#3f51b5" }} />,
             text: "Drainage & Sewerage",
           },
           {
            icon: <BalconyIcon style={{ color: "#673ab7" }} />,
             text: "Building Plumbing",
           },
           {
             icon: <FilterAltIcon style={{ color: "#009688" }} />,
             text: "Water Filtration",
           },
           {
             icon: <WaterIcon style={{ color: "#03a9f4" }} />,
             text: "Waste Water Treatment",
           },
           { icon: <SanitizerIcon style={{ color: "#4caf50" }} />, text: "RO Plant" },
           {
             icon: <LocalFireDepartmentIcon style={{ color: "#f44336" }} />,
             text: "Gas Distribution",
           },
  ];

  return (
    <Box id="hvac-services" sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <TitleBox textAlign="center">
          <Typography variant="h2" component="h2" fontWeight="bold" color="primary" sx={{ fontSize: '2.75rem' }}>
            {title}
          </Typography>
        </TitleBox>

        <Box mb={6}>
          <Grid container spacing={3}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={`service-${index}`}>
                <StyledPaper elevation={3}>
                  <ListItem alignItems="flex-start" sx={{ flexDirection: 'column' }}>
                    <Box display="flex" alignItems="center" mb={1} width="100%">
                      <LargeIcon>
                        <ListItemIcon>
                          {service.icon}
                        </ListItemIcon>
                      </LargeIcon>
                      <ListItemText
                        primary={service.text}
                        primaryTypographyProps={{ 
                          fontWeight: 'medium',
                          fontSize: '1.6rem'
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {service.description}
                    </Typography>
                  </ListItem>
                </StyledPaper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {data && data.length > 0 && (
          <Box>
            {/* <Typography 
              variant="h4" 
              component="h3" 
              textAlign="center" 
              sx={{ mb: 4, fontWeight: 'medium' }}
            >
              Our Projects
            </Typography> */}
            <Grid container spacing={4}>
              {data ? (
                data.map((d, i) => (
                  <Grid item xs={12} sm={6} md={4} key={`project-${i}`}>
                    <StyledCard elevation={4}>
                      <CardMedia
                        component="div"
                        sx={{
                          position: 'relative',
                          paddingTop: '70%',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundImage: `url(${d.smallImage})`,
                        }}
                      />
                      <CardContent>
                        <Typography 
                          variant="h5" 
                          component="h3" 
                          textAlign="center"
                          sx={{ fontSize: '1.5rem' }}
                        >
                          {d.title}
                        </Typography>
                        {d.description && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                            {d.description}
                          </Typography>
                        )}
                      </CardContent>
                    </StyledCard>
                  </Grid>
                ))
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    py: 6
                  }}
                >
                  <CircularProgress size={40} />
                  <Typography variant="h6" sx={{ ml: 2, fontSize: '1.3rem' }}>
                    Loading...
                  </Typography>
                </Box>
              )}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Plumber;