import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import PowerIcon from '@mui/icons-material/Power';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CircularProgress from '@mui/material/CircularProgress';

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

export const HVAC = ({ data, title = "HVAC Services" }) => {
  const services = [
    { 
      icon: <ElectricalServicesIcon color="primary" />, 
      text: "Specialized Air-Conditioning",
      // description: "Custom climate solutions for specialized environments and requirements"
    },
    { 
      icon: <PowerIcon color="primary" />, 
      text: "Variable Refrigerant Volume (VRV)",
      // description: "Energy-efficient systems with precise temperature control for multiple zones"
    },
    { 
      icon: <BatteryChargingFullIcon color="primary" />, 
      text: "Central Air-Conditioning",
      // description: "Advanced control systems for optimal comfort and efficiency"
    },
    { 
      icon: <AcUnitIcon color="primary" />, 
      text: "Chilled Water Systems",
      // description: "High-performance cooling for larger commercial and industrial applications"
    },
    { 
      icon: <LocalFireDepartmentIcon color="error" />, 
      text: "Energy-Efficient Solutions",
      // description: "Eco-friendly HVAC systems that reduce operational costs"
    }
  ];

  return (
    <Box id="HVAC" sx={{ py: 8, bgcolor: 'background.default' }}>
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

export default HVAC;