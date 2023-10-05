import React from 'react';
import { TextField, Container, Typography, Grid, Button } from '@mui/material';
import { useTranslation } from 'react-i18next'; // 导入 useTranslation 钩子


const Dashboard = () => {
  const { t } = useTranslation(); // 使用 useTranslation 钩子

  const dashboardStyle = {
    backgroundColor: 'pink',
    minHeight: '50vh',
    margin:0,
    padding: 0,
  };

  return (
    <section style={dashboardStyle}>
      <Container style={{ padding: 0 }}>
        <Typography variant="h3" style={{ color: 'white', marginTop: '20px' }}>
          {t('dashboardTitle')}
        </Typography>


        <Grid container spacing={3} alignItems="flex-end" style={{ marginTop: '20px' }}>
          <Grid item xs={10} sm={11}>
            <TextField
              fullWidth
              label={t('searchPlaceholder')}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={2} sm={1}>
            <Button variant="contained" style={{ backgroundColor: 'blue', color: 'white' }}>
              {t('searchButton')}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Dashboard;