import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';
import { logoutAction } from '../actions/loginActions';
import { UPDATE_AUTHENTICATION_STATUS } from '../constants/loginConstant';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export interface HeaderComponentProps {
  open: boolean;
  handleDrawerToggle: () => void;

}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ open, handleDrawerToggle }) => {
  const isLoggedIn = sessionStorage.getItem('accessToken') !== null;

  const userData = useSelector((state: RootState) => state.user.userData);
  const firstName = sessionStorage.getItem('firstName') || '';
const lastName = sessionStorage.getItem('lastName') || '';
const name = firstName + ' ' + lastName;
  const avatar = sessionStorage.getItem('avatar') || '';
  let title = '';

  useEffect(() => {
    document.title = 'Chat Session Frontend React JS Prototype Challenge';
    title = document.title;
  }, []);

  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutAction());
       // Reset the authentication status to false
       dispatch({ type: UPDATE_AUTHENTICATION_STATUS, isAuthenticated: false });
       sessionStorage.removeItem('loginError');
    // Send a signal to the HeaderComponent to reset protected data and display guest pages
    const headerComponent = document.getElementById('header-component');
    if (headerComponent) {
      headerComponent.setAttribute('data-logout', 'true');
    }
    navigate('/');
  };

  const handleDashboardClick = (menuItem: string) => {
    switch (menuItem) {
      case 'main':
        navigate('/main');
        break;
      case 'users':
        navigate('/');
        break;
      case 'logout':
        logoutHandler();
        break;
      default:
        break;
    }
    handleCloseUserMenu();
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={process.env.PUBLIC_URL + '/logo192.png'}
            alt="Logo"
            style={{ width: '50px', height: '50px', marginRight: '10px' }}
          />
          <Typography variant="h6" noWrap component="div" id="logo">
            Chat Session Frontend React JS Prototype Challenge
          </Typography>
        </div>
        <Box sx={{ flexGrow: 0, ml: 'auto' }}>
          <Tooltip title="Cart">
            <IconButton sx={{ p: 0, mx: 1 }}>
              <ShoppingCartIcon />
            </IconButton>
          </Tooltip>
          {isLoggedIn && (
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
                id="avatar-icon-button"
              >
                <Avatar alt={name || ''} src={avatar || ''} />
              </IconButton>
            </Tooltip>
          )}
          {!isLoggedIn && (
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="https://avatars.githubusercontent.com/u/vvv?v=5" />
              </IconButton>
            </Tooltip>
          )}
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {isLoggedIn ? (
              [
                <MenuItem key="settings" onClick={() => handleDashboardClick('settings')}>
                  <Typography textAlign="center">{name}</Typography>
                </MenuItem>,
                <MenuItem key="main" onClick={() => handleDashboardClick('main')}>
                  <Box component="span" mr={1}>
                    <DashboardIcon />
                  </Box>
                  <Typography textAlign="center">Chat</Typography>
                </MenuItem>,
                <MenuItem key="logout" onClick={() => handleDashboardClick('logout')}>
                  <Box component="span" mr={1}>
                    <ExitToAppIcon />
                  </Box>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>,
              ]
            ) : (
              <MenuItem onClick={() => handleDashboardClick('users')}>
                <Box component="span" mr={1}>
                  <LockIcon />
                </Box>
                <Typography textAlign="center">Login</Typography>
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
