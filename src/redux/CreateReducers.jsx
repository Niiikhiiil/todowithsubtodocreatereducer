import { createAction, createReducer, nanoid } from '@reduxjs/toolkit';

const ADD_TODO = createAction('ADD_TODO');
const DELETE_TODO = createAction('DELETE_TODO');
const EDIT_TODO = createAction('EDIT_TODO');
const CHECKBOX_CHANGE = createAction('CHECKBOX_CHANGE');
const DELETE_CHECKED = createAction('DELETE_CHECKED');
const DELETE_ALL = createAction('DELETE_ALL');
const ADD_TODO_SUB = createAction('ADD_TODO_SUB');
const DELETE_SUB = createAction('DELETE_SUB');
const EDIT_SUB = createAction('EDIT_SUB');
const CHECKBOX_CHANGE_SUB = createAction('CHECKBOX_CHANGE_SUB');


const initialState = {
	todo: [],
	addCount: 0,
	editCount: 0,
	deleteCount: 0,
	deleteAllCount: 0,
	selectedDeleteCount: 0,
};


const modifyReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(ADD_TODO, (state, { payload }) => {
			let ui = {
				id: nanoid(),
				td: payload.t,
				check: false,
				subtodo: [],
		        date:payload.date
			};
			console.log(payload.t);
			void (state.todo = [...state.todo, ui]);
			state.addCount++;
		})
		.addCase(DELETE_TODO, (state, { payload }) => {
			return {
				...state,
				todo: state.todo.filter((g) => g.id !== payload.id),
				deleteCount: state.deleteCount + 1,
			};
		})
		.addCase(EDIT_TODO, (state, { payload }) => {
			void {
				...state,
				editCount: state.editCount++,
				todo: state.todo.map((e) => {
					if (e.id === payload.id) {
						e.td = payload.t;
						e.date = payload.date;
					}
				}),
			};
		})
		.addCase(CHECKBOX_CHANGE, (state, { payload }) => {
			void {
				todo: state.todo.map((e) => {
					if (e.id === payload.id) {
						e.check = payload.check;
					}
				}),
			};
		})
		.addCase(ADD_TODO_SUB, (state, { payload }) => {
			let sub = {
				sid: nanoid(),
				subtd: payload.subtd,
				check: false,
			};
			void {
				...state,
				todo: state.todo[Number(payload.i)].subtodo.push(sub),
			};
		})
		.addCase(DELETE_SUB, (state, { payload }) => {
			void {
				...state,
				todo: state.todo.map((g) => {
					if (g.id === payload.id) {
						g.subtodo = g.subtodo.filter(
							(s) => s.sid !== payload.sid,
						);
					}
				}),
				selectedDeleteCount: state.selectedDeleteCount + 1,
			};
		})
		.addCase(CHECKBOX_CHANGE_SUB, (state, { payload }) => {
			void {
				...state,
				todo: state.todo[Number(payload.i)].subtodo?.map((s) => {
					if (s.sid === payload.sid) {
						s.check = payload.check;
					}
				}),
			};
		})
		.addCase(DELETE_CHECKED, (state) => {
			return {
				...state,
				todo: state.todo.filter((g) => g.check !== true),
				selectedDeleteCount: state.selectedDeleteCount + 1,
			};
		})
		.addCase(EDIT_SUB, (state, { payload }) => {
			void {
				...state,
				todo: state.todo[Number(payload.i)].subtodo?.map((s) => {
					if (s.sid === payload.sid) {
						s.subtd = payload.subtd;
					}
				}),
			};
		})
		.addCase(DELETE_ALL, (state) => {
			return {
				...state,
				todo: [],
				deleteAllCount: state.deleteAllCount + 1,
			};
		})
		
});

export default modifyReducer;
