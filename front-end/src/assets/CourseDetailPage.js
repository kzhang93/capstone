// CourseDetailPage.js

import React from 'react';
import { Button, Typography } from '@mui/material';

const CourseDetailPage = ({ goBack }) => {
  return (
    <div>
      <Button variant="contained" color="primary" onClick={goBack}>Go Back</Button>
      <img src="./src/assets/HCL.png" alt="HCI Course" />
      <Typography variant="h6">COM 525 Introduction to Human Computer Interaction</Typography>
      <Typography variant="body1">A$50.00</Typography>
      <Typography variant="body2">
        This course introduces HCI user-centered practice. The course will cover both theoretical and practical applications of Human-Computer Interaction concepts. {/* ... and so on */}
      </Typography>
      <div>
        Quantity: 
        <button>-</button>
        <span>1</span>
        <button>+</button>
      </div>
      <Button variant="contained" color="primary">Add to chart</Button>
    </div>
  );
};

export default CourseDetailPage;
