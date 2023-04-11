import React, { useState } from 'react';
import List from './List';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
	const { todo } = useSelector((state) => state.todo);
	const [input, setInput] = useState('');
	const [date, setDate] = useState('');
	const [edit, setEdit] = useState(false);
	const [error, setError] = useState('');
	const [id, setId] = useState('');
	const dispatch = useDispatch();

	return (
		<>
			<div
				style={{ marginBottom: '10px' }}
				className="home"
			>
				<div>
					<h3>TODO-SUBTODO</h3>
				</div>
				<div>
					
				</div>
				<div>
					<input
						className="mainInput"
						type="text"
						placeholder="Add todo..."
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<input
						className="date"
						type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
					
					{edit ? (
						<button
							className="edit"
							onClick={() => {
								if (input !== '' ) {
									dispatch({
										type: 'EDIT_TODO',
										payload: {
											t: input,
											id: id,
											date: date,
										},
									});
									setDate('');
									setInput('');
									setEdit(!edit);
									setError('');
								} else {
									setError('This field is empty');
								}
							}}
						>
							Edit
						</button>
					) : (
						<button
							className="add"
							onClick={() => {
								if (input !== ''&& date!=='') {
									dispatch({
										type: 'ADD_TODO',
										payload: { t: input, date: date },
									});
									setInput('');
									setError('');
									setDate('');
								} else {
									setError('field is empty');
								}
							}}
						>
							Add
						</button>
					)}
					{error}
				</div>
			</div>
			<div className="filterButtonDiv">
				{todo.some((t) => t.check === true) && (
					<button
						className="deleteSelected"
						onClick={() => dispatch({ type: 'DELETE_CHECKED' })}
					>
						DELETE SELECTED
					</button>
				)}
				{todo.length > 3 && (
					<button
						className="deleteAll"
						onClick={() => dispatch({ type: 'DELETE_ALL' })}
					>
						DELETE ALL
					</button>
				)}
			</div>
			<div className={todo.length > 0 && 'listmain'}>
				<List
					setEdit={setEdit}
					setInput={setInput}
					setId={setId}
					edit={edit}
					setDate={setDate}
				/>
			</div>
		</>
	);
};

export default Home;
