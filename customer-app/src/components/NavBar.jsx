/* Navigation bar */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Session from '../Context/Session'
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('xs')]: {
      display: 'none',
    },
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const menuId = 'primary-search-account-menu';

  const renderMenu = (
    <Menu
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
    </Menu>
  );

  const { isLoggedIn } = Session()

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Snacks in a Van
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Tab icon={<HomeIcon />} label="Home" href='/#/home' />
            <Tab icon={<MenuBookIcon />} label="Menu" href='/#/menu'/>
            {isLoggedIn() && <Tab icon={<ShoppingCartIcon />} label="Cart" href='/#/cart' />}
            <Tab icon={<LocalShippingIcon />} label="About Us" href='/#/aboutus'/>
            {isLoggedIn() && <Tab icon={<AccountCircle />} label="Account" href='/#/account' />}
            {!isLoggedIn() && <Tab icon={<AccountCircle />} label="Login" href='/#/login' />}
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
