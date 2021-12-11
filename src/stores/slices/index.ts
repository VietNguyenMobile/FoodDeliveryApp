import { combineReducers } from 'redux';
import tab from './tabSlice'

export default combineReducers({
  tab: tab.reducer
})