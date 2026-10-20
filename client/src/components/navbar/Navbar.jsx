import * as React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import CartWidget from '../cartWidget/CartWidget';

const pages = ['Shop', 'Rebajas', 'Locales'];

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElShop, setAnchorElShop] = React.useState(null);

    
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    //Controla la apertura/cierre de Shop
    const handleOpenShopMenu = (event) => {
        setAnchorElShop(event.currentTarget);
    };

    const handleCloseShopMenu = () => {
        setAnchorElShop(null);
    };

    return (
        <AppBar position="fixed" sx={{ width: '100%', backgroundColor: '#f1f1f1' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Link to={`/`}>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            VALSAA
                        </Typography>
                    </Link>
                    

                    {/*Menu hamburguesa en mobile*/}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/*Menu en compu*/}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) =>
                            page === 'Shop' ? (
                                <Box key={page}>
                                    <Button
                                        onClick={handleOpenShopMenu}
                                        sx={{ my: 2, color: '#202020', display: 'block' }}
                                    >
                                        {page}
                                    </Button>
                                    {/*Menu desplegable de Shop*/}
                                    <Menu
                                        id="shop-menu"
                                        anchorEl={anchorElShop}
                                        open={Boolean(anchorElShop)}
                                        onClose={handleCloseShopMenu}
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                    >
                                        <MenuItem onClick={handleCloseShopMenu}>
                                            <Link to="/category/Blusa" style={{ textDecoration: 'none', color: 'black' }}>
                                                Blusa
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseShopMenu}>
                                            <Link to="/category/Camisa" style={{ textDecoration: 'none', color: 'black' }}>
                                                Camisa
                                            </Link>
                                        </MenuItem>
                                        
                                        <MenuItem onClick={handleCloseShopMenu}>
                                            <Link to="/category/Chaleco" style={{ textDecoration: 'none', color: 'black' }}>
                                                Chaleco
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseShopMenu}>
                                            <Link to="/category/Buzo" style={{ textDecoration: 'none', color: 'black' }}>
                                                Buzo
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseShopMenu}>
                                            <Link to="/category/Campera" style={{ textDecoration: 'none', color: 'black' }}>
                                                Campera
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseShopMenu}>
                                            <Link to="/category/Vestido" style={{ textDecoration: 'none', color: 'black' }}>
                                                Vestido
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseShopMenu}>
                                            <Link to="/category/Pantalon" style={{ textDecoration: 'none', color: 'black' }}>
                                                Pantalon
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseShopMenu}>
                                            <Link to="/category/Pollera" style={{ textDecoration: 'none', color: 'black' }}>
                                                Pollera
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseShopMenu}>
                                            <Link to="/category/Calzado" style={{ textDecoration: 'none', color: 'black' }}>
                                                Calzado
                                            </Link>
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            ) : (
                                    <Button
                                        key={page}
                                        sx={{ my: 2, color: '#202020', display: 'block' }}
                                    >
                                        {page}
                                    </Button>
                                
                            )
                        )}
                    </Box>
                    <Link to={`/cart`}><CartWidget /></Link>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;