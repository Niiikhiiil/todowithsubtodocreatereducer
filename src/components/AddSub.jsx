import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_SUBTODO } from '../redux/CreateReducers';

const AddSub = ({ subId, i }) => {
	const [subtodo, setSubtodo] = useState('');
	const [showSub, setShowSub] = useState(false);
	const dispatch = useDispatch();

	const handleSubTodo = (id) => {
		dispatch({
			type: 'ADD_TODO_SUB',
			payload: { id: id, subtd: subtodo, i: i },
		});
		setShowSub(!showSub);
	};

	return showSub ? (
		<>
			<input
            className='subtodo'
				type="text"
				onChange={(e) => setSubtodo(e.target.value)}
			/>
			<button className='addsub' onClick={() => handleSubTodo(subId)}>ADDSUB</button>
		</>
	) : (
		<button className='addsub' onClick={() => setShowSub(!showSub)}>ADDSUB</button>
	);
};

export default AddSub;
