
import {combineReducers}  from 'redux';
import cart from './rcart';
import product from './rproduct';
import favorite from './rfavorite';
import filter from './rfilter';
import notification from './rnotifications'
import timestamp from './rrequest';
import displayfilter from './rdisplayfilter';
import customer from './rcustomer';
const reducer = combineReducers({
  cart,
  product,
  favorite,
  filter,
  notification,
  timestamp,
  displayfilter,
  customer
});

export default reducer;
