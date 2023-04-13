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
const SEARCH = createAction('SEARCH');
const RESET = createAction('RESET');
const NOTFOUND = createAction('NOTFOUND');
const CHANGE_SELECT = createAction('CHANGE_SELECT');
const CHANGE_SELECT_SUB = createAction('CHANGE_SELECT_SUB');
const FILTER_BY_DATE = createAction('FILTER_BY_DATE');

const initialState = {
	todo: [],
	addCount: 0,
	editCount: 0,
	deleteCount: 0,
	deleteAllCount: 0,
	selectedDeleteCount: 0,
	searchTodo: [],
	notFound: '',
	filterByArrayTodo: [],
};

const modifyReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(ADD_TODO, (state, { payload }) => {
			console.log(payload.select);
			let ui = {
				id: nanoid(),
				td: payload.t,
				check: false,
				subtodo: [],
				date: payload.date,
				select: payload.select,
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
				searchTodo: state.todo.filter((q) => q.id !== payload.id),
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
				searchTodo: state.searchTodo.map((e) => {
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
				searchTodo: state.searchTodo.map((e) => {
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
				select: '',
			};
			void {
				...state,
				todo: state.todo.map((st) => {
					if (st.id === payload.id) {
						st.subtodo.push(sub);
					}
				}),
				searchTodo: state.searchTodo.map((st) => {
					if (st.id === payload.id) {
						st.subtodo.push(sub);
					}
				}),
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
				searchTodo: state.searchTodo.map((g) => {
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
				todo: state.todo.map((s) => {
					if (s.id === payload.id) {
						return s.subtodo.map((q) => {
							if (q.sid === payload.sid) {
								return (q.check = payload.check);
							}
						});
					}
				}),
				searchTodo: state.searchTodo.map((d) => {
					if (d.id === payload.id) {
						return d.subtodo.map((q) => {
							if (q.sid === payload.sid) {
								return (q.check = payload.check);
							}
						});
					}
				}),
			};
		})
		.addCase(DELETE_CHECKED, (state) => {
			return {
				...state,
				todo: state.todo.filter((g) => g.check !== true),
				searchTodo: state.searchTodo.filter((g) => g.check !== true),
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
		.addCase(SEARCH, (state, { payload }) => {
			let searchList = state.todo.filter((r) => {
				return r.td.includes(payload.search.toLowerCase());
			});
			if (searchList.length > 0) {
				return {
					...state,
					searchTodo: [...searchList],
				};
			} else {
				return {
					...state,
					notFound: 'Result Not Found',
				};
			}
		})
		.addCase(RESET, (state) => {
			state.searchTodo = [];
			void { ...state };
		})
		.addCase(NOTFOUND, (state) => {
			state.notFound = '';
			void { ...state };
		})
		.addCase(CHANGE_SELECT, (state, { payload }) => {
			void {
				...state,
				todo: state.todo.map((r) => {
					if (r.id === payload.id) {
						r.select = payload.select;
					}
				}),
				searchTodo: state.searchTodo.map((i) => {
					if (i.id === payload.id) {
						i.select = payload.select;
					}
				}),
			};
		})
		.addCase(CHANGE_SELECT_SUB, (state, { payload }) => {
			void {
				...state,
				todo: state.todo.map((r) => {
					if (r.id === payload.id) {
						return r.subtodo.map((q) => {
							if (q.sid === payload.sid) {
								return (q.select = payload.select);
							}
						});
					}
				}),
				searchTodo: state.searchTodo.map((i) => {
					if (i.id === payload.id) {
						return i.subtodo.map((q) => {
							if (q.sid === payload.sid) {
								return (q.select = payload.select);
							}
						});
					}
				}),
			};
		})
		.addCase(FILTER_BY_DATE, (state, { payload }) => {
			// let u = payload.dateArray;
			console.log(payload.startdate);
			let sDate = new Date(payload.startdate);
			let q = [];
			while (sDate <= payload.enddate) {
				state.todo.map((f) => {
					if (f.date == sDate) {
						return (q = [...q, f]);
					}
				});
				sDate.setTime(sDate.getTime() + 24 * 60 * 60 * 1000);
			}
			console.log(q);
			void {
				...state,
				// filterByArrayTodo: state.filterByArrayTodo.push(q),
			};
		});
});

export default modifyReducer;
