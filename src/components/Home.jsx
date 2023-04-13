import React, { useState } from 'react';
import List from './List';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Home = () => {
	const [startdate, setStartdate] = useState(new Date());
	const [enddate, setEnddate] = useState(new Date());
	const [selectedd, setSelected] = useState('');
	const { todo } = useSelector((state) => state.todo);
	const [input, setInput] = useState('');
	const [date, setDate] = useState('');
	const [edit, setEdit] = useState(false);
	const [error, setError] = useState('');
	const [id, setId] = useState('');
	const [search, setSearch] = useState('');
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	const { searchTodo } = useSelector((state) => state.todo);
	const select = ['start', 'pending', 'finish'];

	const handleFilterDate = () => {
		let sDate = startdate;

		// let dateArray = [];
		// while (sDate <= enddate) {
		// 	dateArray.push(new Date(sDate).toString());
		// 	sDate.setTime(sDate.getTime() + 24 * 60 * 60 * 1000);
		// }
		// console.log(dateArray);
		dispatch({
			type: 'FILTER_BY_DATE',
			payload: {
				startdate: startdate.toString(),
				enddate: enddate.toString(),
			},
		});
	};

	const handleSearch = () => {
		dispatch({
			type: 'SEARCH',
			payload: { search: search },
		});
		setSearch('');
		setShow(!show);
	};

	const handleReset = () => {
		dispatch({ type: 'RESET' });
		setSearch('');
		setShow(!show);
	};

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
					<input
						className="mainInput"
						type="text"
						placeholder="Add todo..."
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<DatePicker
						id="start-date"
						selected={date}
						startDate={date}
						placeholderText="select Date"
						valueDefault={null}
						onChange={(date) => setDate(date)}
						className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline date"
					/>

					<select
						className="option"
						name="select"
						value={selectedd}
						onChange={(e) => setSelected(e.target.value)}
					>
						<option>select</option>
						{select.map((f, i) => {
							return (
								<option
									key={f + i}
									value={f}
								>
									{f}
								</option>
							);
						})}
					</select>

					{edit ? (
						<button
							className="edit"
							onClick={() => {
								if (input !== '') {
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
								if (input !== '' && date !== '') {
									dispatch({
										type: 'ADD_TODO',
										payload: {
											t: input,
											date: date.toString(),
											select: selectedd,
										},
									});
									setInput('');
									setError('');
									setDate('');
									setSelected('');
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
			<div className="searchDiv">
				<input
					type="text"
					value={search}
					className="searchInput"
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button
					className="search"
					onClick={() => handleSearch()}
				>
					{' '}
					Search
				</button>
				{searchTodo.length > 0 && show && (
					<button
						className="reset"
						onClick={() => handleReset()}
					>
						{' '}
						home
					</button>
				)}
			</div>
			<div>
				<DatePicker
					id="start-date"
					placeholderText="select Date"
					selected={startdate}
					valueDefault={null}
					onChange={(date) => setStartdate(date)}
					className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline date"
				/>
				<DatePicker
					id="start-date"
					placeholderText="select Date"
					selected={enddate}
					valueDefault={null}
					onChange={(date) => setEnddate(date)}
					className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline date"
				/>
				<button onClick={() => handleFilterDate()}>Filter</button>
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

			<List
				setEdit={setEdit}
				setInput={setInput}
				setId={setId}
				edit={edit}
				setDate={setDate}
			/>
		</>
	);
};

export default Home;
