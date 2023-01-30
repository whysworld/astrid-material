import React from 'react';
import './App.css';
import { Home } from './pages/home';
import { Routes, Route } from "react-router-dom";
import { APIsPage } from './pages/apis';
import { DocsPage } from './pages/docs';
import { LocationPage } from './pages/location';
import { AstridAPIsPage } from './pages/astrid_apis';
import { Navigation } from './components/Navigation';
import { Box, Grid } from '@mui/material';
import { SettingsPage } from './pages/settings';
import { AstridHeader } from './components/AstridHeader/AstridHeader';

function App() {
  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <header className="App-header" />
        <Navigation />
        <Grid container flexDirection='column'>
          <Grid item>
            <AstridHeader />
          </Grid>
          <Grid item>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/apis' element={<APIsPage />} />
              <Route path='/docs' element={<DocsPage />} />
              <Route path='/location' element={<LocationPage />} />
              <Route path='/astrid_apis' element={<AstridAPIsPage />} />
              <Route path='/settings' element={<SettingsPage />} />
            </Routes>
          </Grid>
        </Grid>

      </Box>
    </div>
  );
}

export default App;
