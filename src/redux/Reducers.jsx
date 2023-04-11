// import { createSlice, nanoid } from '@reduxjs/toolkit';

// const Reducers = createSlice({
// 	name: 'todo',
// 	initialState: {
// 		todo: [],
// 		addCount: 0,
// 		deleteCount: 0,
// 		deleteAllCount: 0,
// 		selectedDeleteCount: 0,
// 		editCount: 0,
// 	},
// 	reducers: {
// 		ADD_TODO: (state, action) => {
// 			let ui = {
// 				id: nanoid(),
// 				td: action.payload.t,
// 				check: false,
// 			};
// 			void (state.todo = [...state.todo, ui]);
// 			state.addCount++;
// 		},
// 		DELETE_TODO: (state, action) => {
// 			return {
// 				...state,
// 				todo: state.todo.filter((g) => g.id !== action.payload.id),
// 				deleteCount: state.deleteCount + 1,
// 			};
// 		},
// 		EDIT_TODO: (state, action) => {
// 			void {
// 				...state,
// 				todo: state.todo.map((e) => {
// 					if (e.id === action.payload.id) {
// 						e.td = action.payload.t;
// 					}
// 				}),
// 				editCount: state.editCount + 1,
// 			};
// 		},
// 		CHECKBOX_CHANGE: (state, action) => {
// 			void {
// 				todo: state.todo.map((e) => {
// 					if (e.id === action.payload.id) {
// 						e.check = action.payload.check;
// 					}
// 				}),
// 			};
// 		},
// 		DELETE_CHECKED: (state) => {
// 			return {
// 				...state,
// 				todo: state.todo.filter((g) => g.check !== true),
// 				selectedDeleteCount: state.selectedDeleteCount + 1,
// 			};
// 		},
// 		DELETE_ALL: (state) => {
// 			return {
// 				...state,
// 				todo: [],
// 				deleteAllCount: state.deleteAllCount + 1,
// 			};
// 		},
// 	},
// });

// export const {
// 	ADD_TODO,
// 	DELETE_TODO,
// 	EDIT_TODO,
// 	CHECKBOX_CHANGE,
// 	DELETE_CHECKED,
// 	DELETE_ALL,
// } = Reducers.actions;
// export default Reducers.reducer;
