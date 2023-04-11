import { configureStore } from '@reduxjs/toolkit';
// import modifyReducer from './Reducers'
import modifyReducer from './CreateReducers';
import { combineReducers } from '@reduxjs/toolkit';

export default configureStore({
	reducer: {
		todo: modifyReducer,
	},
});
