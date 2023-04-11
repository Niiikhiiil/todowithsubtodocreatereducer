import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const SubEdit = ({ sid, i, subtd }) => {
	const [subInput, setSubInput] = useState('');
	const [subEdit, setSubEdit] = useState(false);
	const dispatch = useDispatch();

	return subEdit ? (
		<>
			<input
				type="text"
				value={subInput}
				onChange={(e) => setSubInput(e.target.value)}
			/>
			<button
				className="editSub"
				onClick={() => {
					dispatch({
						type: 'EDIT_SUB',
						payload: {
							subtd: subInput,
							i: i,
							sid: sid,
						},
					});
					setSubEdit(!subEdit);
				}}
			>
				Edit
			</button>
		</>
	) : (
		<button
			className="editSub"
			onClick={() => {
				setSubEdit(!subEdit);
				setSubInput(subtd);
			}}
		>
			Edit
		</button>
	);
};

export default SubEdit;
