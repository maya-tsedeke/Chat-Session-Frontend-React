import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import LoginScreen from './components/LoginScreen';
import MainScreen from './components/MainScreen';
import CommonTable from './components/CommonTable';
import ChatSessionsScreen from './components/ChatSession';
import SideBarComponent from './components/SideBarComponent';
import HeaderComponent from './components/HeaderComponent';
import { Box, CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';
import DataViewer from './components/DataViewer';
import Protected from './ProtectedRoute';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function App() {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );

}

export default App;
function Root() {
  const isAuthenticated = sessionStorage.getItem('accessToken') !== null;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Provider store={store}>
      <div className="App">
      
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <HeaderComponent open={open} handleDrawerToggle={handleDrawerToggle} />
            <SideBarComponent open={open} handleDrawerClose={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <DrawerHeader />
              <Routes>
                <Route path="/main" element={<Protected isAuthenticated={isAuthenticated}><MainScreen /></Protected>} />
                <Route path="/chat" element={<Protected isAuthenticated={isAuthenticated}><ChatSessionsScreen /></Protected>} />
                <Route path="/" element={<LoginScreen />} />
                <Route path="/table" element={<CommonTable data={[]} />} />
                <Route path="/data" element={<DataViewer />} />
              </Routes>
            </Box>
          </Box>
       
      </div>
    </Provider>
  );
}