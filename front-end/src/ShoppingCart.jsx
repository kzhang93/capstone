import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const addItemToCart = (item) => {
    setCart([...cart, item]);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => addItemToCart('Item 1')}>
        Add to Cart
      </Button>
      
      <Button variant="contained" color="secondary" onClick={toggleDrawer(true)}>
        Open Cart
      </Button>
      
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box width={300} p={3}>
          <Typography variant="h5">
            Shopping Cart
          </Typography>
          <Button onClick={toggleDrawer(false)}>X</Button>
          {cart.length === 0 ? (
            <Typography variant="body2">
              Your cart is empty!
            </Typography>
          ) : (
            <ul>
              {cart.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
          <Typography variant="h6">
            Total: $00.00
          </Typography>
          <Button type="button" disabled>
            Checkout
          </Button>
        </Box>
      </Drawer>
    </div>
  );
};

export default ShoppingCart;
