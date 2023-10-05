import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Select,
  MenuItem,
  Badge,
  Container,
  Typography,
  Button,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';

function Header() {
  const [language, setLanguage] = useState('en');
  const { t } = useTranslation();

  const bgStyle = {
    backgroundImage: `url('./src/assets/zhuye.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const handleCartClick = () => {
    window.open('Cartpage.html', '_blank');
  };

  const handleAppointmentsClick = () => {
    window.open('newAppointment.html', '_blank');
  };

  

  return (
    <div style={bgStyle}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <img src="./src/assets/zhulogo.png" alt="logo" style={{ width: 200 }} />
          </IconButton>

          <Container maxWidth="lg">
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Button variant="text" color="inherit">
                  {t('home')}
                </Button>
              </Grid>
              <Grid item>
              <Button variant="text" color="inherit" >
                  {t('tutorProfiles')}
                </Button>
              </Grid>
              <Grid item>
                <Button variant="text" color="inherit">
                  {t('unitsOfStudy')}
                </Button>
              </Grid>
              <Grid item>
                <Button variant="text" color="inherit" onClick={handleAppointmentsClick}>
                  {t('appointments')}
                </Button>
              </Grid>
              <Grid item>
                <Button variant="text" color="inherit">
                  {t('admin')}
                </Button>
              </Grid>
            </Grid>
          </Container>

          <div style={{ flexGrow: 1 }}></div>

          <Select
            id="nav_language_select"
            value={language}
            onChange={handleLanguageChange}
          >
            <MenuItem value="en">{t('English')}</MenuItem>
            <MenuItem value="zh_CN">{t('简体中文')}</MenuItem>
            <MenuItem value="zh_TW">{t('繁體中文')}</MenuItem>
          </Select>

          <IconButton aria-label="cart" color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={0} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <IconButton aria-label="login" color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Grid container direction="column" alignItems="center" spacing={4}>
          <Grid item>
            <Typography variant="h3" style={{ textAlign: 'center', color: 'green', margin: '10px' }}>
              {t('platformName')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" style={{ textAlign: 'center', color: 'red', margin: '10px' }}>
              {t('platformDescription')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" style={{ textAlign: 'center', color: 'yellow', margin: '10px' }}>
              {t('signUp')}
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              <Typography variant="button" style={{ color: 'white' }}>
                {t('registerNow')}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Header;