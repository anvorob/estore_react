
import {combineReducers}  from 'redux';
import cart from './rcart';
import product from './rproduct';
import favorite from './rfavorite';
import filter from './rfilter';
import notification from './rnotifications'
const reducer = combineReducers({
  cart,
  product,
  favorite,
  filter,
  notification
});

export default reducer;
