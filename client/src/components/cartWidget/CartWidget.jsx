import * as React from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';

const CartWidget = () => {
  const { lista } = useContext(ShopContext);

  let cantidad = 0;
  lista.forEach(prod => {
    cantidad += prod.quantity;
  });

  return (
      <Badge badgeContent={cantidad} color="primary" sx={{marginRight: '18px'}}>
        <ShoppingCartIcon color="action" />
      </Badge>
    
  )
};

export default CartWidget;