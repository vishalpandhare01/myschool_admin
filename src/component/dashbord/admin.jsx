// pages/index.js
import React from 'react';
import { AppBar, Box, Drawer, Grid, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';

const drawerWidth = 240;

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex' , marginTop:8 }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
        }}
      >
        {/* Topbar */}
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" noWrap>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 1, boxShadow: 1 }}>
              <Typography variant="h6">Card 1</Typography>
              <Typography variant="body1">Content for card 1...</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 1, boxShadow: 1 }}>
              <Typography variant="h6">Card 2</Typography>
              <Typography variant="body1">Content for card 2...</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 1, boxShadow: 1 }}>
              <Typography variant="h6">Card 3</Typography>
              <Typography variant="body1">Content for card 3...</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
