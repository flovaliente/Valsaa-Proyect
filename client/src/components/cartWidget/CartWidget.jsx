import * as React from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';

const CartWidget = () => {
  const { totalItems } = useContext(ShopContext);

  return (
      <Badge badgeContent={totalItems} color="primary" sx={{marginRight: '18px'}}>
        <ShoppingCartIcon color="action" />
      </Badge>

  )
};

export default CartWidget;
