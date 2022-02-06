import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../reducers';

type Props = {};

const CartScreen = (props: Props) => {
  const dispatch = useDispatch();
  const { cartItems, shippingAddress} = useSelector((state: State) => state.cart)
  console.log(cartItems);
  return <div>Cart</div>;
};

export default CartScreen;
