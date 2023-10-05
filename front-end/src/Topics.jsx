import React, { useState } from 'react';
import { Container, Grid, Button, Typography, Tabs, Tab } from '@mui/material';
import { useTranslation } from 'react-i18next';

const App = () => {
  const [selectedTab, setSelectedTab] = useState("All Categories");
  const { t } = useTranslation();

  const welcomeStyle = {
    backgroundImage: `url('./src/assets/topic_bground.jpeg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    margin:0,
    padding: 0,
  };
  

  const courses = {
    "All Categories": [
      ["HCL.png", t('course1')],
      ["KOR.png", t('course2')],
      ["CSE.png", t('course3')],
      ["TTennis.png", t('course4')],
      ["CHI.jpeg", t('course5')],
      ["MAT.jpg", t('course6')]
    ],
    "Physical Education": [
      ["TTennis.png", t('course4')],
    ],
    "Linguistic": [
      ["KOR.png", t('course2')],
      ["CHI.jpeg", t('course5')],
    ],
    "Science": [
      ["CSE.png", t('course3')],
      ["HCL.png", t('course1')],
      ["MAT.jpg", t('course6')],
    ]
  };

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleBuyNowClick = (courseTitle) => {
    let newUrl;
    if (courseTitle === t('course1')) {
      newUrl = 'newPage.html'; 
    } else if (courseTitle === t('course2')) {
      newUrl = 'course2.html';
    } else if (courseTitle === t('course3')) {
      newUrl = 'course3.html';
    } else if (courseTitle === t('course4')) {
      newUrl = 'course4.html';
    } else if (courseTitle === t('course5')) {
      newUrl = 'course5.html';
    } else if (courseTitle === t('course6')) {
      newUrl = 'course6.html';
    } else {
      newUrl = 'https://www.example.com/';
    }
    window.open(newUrl, '_blank');
  };

  return (
    <div>
      <section style={welcomeStyle}>
      <Container style={{ padding: 0 }}>
        <Grid container spacing={0}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom style={{ color: 'white' }}>
                {t('courseList')}
              </Typography>
              <Tabs value={selectedTab} onChange={handleChange} indicatorColor="primary" textColor="primary">
                <Tab label={t('allCategories')} value="All Categories" />
                <Tab label={t('physicalEducation')} value="Physical Education" />
                <Tab label={t('linguistic')} value="Linguistic" />
                <Tab label={t('science')} value="Science" />
              </Tabs>
            </Grid>

            <Grid container spacing={0} style={{ marginTop: '40px' }}>
              {courses[selectedTab].map(([image, title], index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <img src={`./src/assets/${image}`} alt={title} style={{ maxWidth: '100%', height: 'auto' }} />
                  <Typography variant="h6" style={{ textAlign: 'center', marginTop: '10px', color: 'white' }}>
                    {title}
                  </Typography>
                  <Button 
                    variant="contained" 
                    style={{ backgroundColor: 'green', color: 'white', display: 'block', margin: 'auto', marginTop: '10px' }}
                    onClick={() => handleBuyNowClick(title)}
                  >
                    {t('buyNow')}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Container>
      </section>
    </div>
  );
};

export default App; 