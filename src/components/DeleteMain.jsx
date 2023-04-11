import { nanoid } from '@reduxjs/toolkit';
import React from 'react';

const DeleteMain = ({ id, edit, dispatch }) => {
	return (
		<>
			<button
				className="delete"
				disabled={id && edit}
				key={nanoid()}
				onClick={() =>
					dispatch({
						type: 'DELETE_TODO',
						payload: { id: id },
					})
				}
			>
				DELETE
			</button>
		</>
	);
};

export default DeleteMain;
