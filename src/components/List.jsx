import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddSub from './AddSub';
import SubEdit from './SubEdit';
import DeleteMain from './DeleteMain';
// import { CHECKBOX_CHANGE, DELETE_TODO } from '../redux/Reducers';

const List = ({ setInput, setEdit, setId, edit, setDate }) => {
	const { notFound } = useSelector((state) => state.todo);
	const { todo } = useSelector((state) => state.todo);
	const { searchTodo } = useSelector((state) => state.todo);
	const select = ['start', 'pending', 'finish'];
	const dispatch = useDispatch();
	const handleCheckBox = (id, check) => {
		dispatch({
			type: 'CHECKBOX_CHANGE',
			payload: { id: id, check: !check },
		});
	};

	const handleSubCheckBox = (id, sid, check, index) => {
		dispatch({
			type: 'CHECKBOX_CHANGE_SUB',
			payload: { id: id, sid: sid, check: !check, i: index },
		});
	};

	const handleSelect = (e, id) => {
		dispatch({
			type: 'CHANGE_SELECT',
			payload: { id: id, select: e.target.value },
		});
	};
	const handleSubSelect = (e, id, sid) => {
		dispatch({
			type: 'CHANGE_SELECT_SUB',
			payload: { select: e.target.value, id: id, sid: sid },
		});
	};
	return (
		<div>
			{searchTodo.length > 0 ? (
				searchTodo.map((t, i) => {
					return (
						<>
							<div
								className="list"
								key={nanoid()}
							>
								<div>
									<input
										type="checkbox"
										checked={t.check}
										onChange={() =>
											handleCheckBox(t.id, t.check)
										}
									/>
								</div>
								<div>{t.td}</div>
								<div>{t.date}</div>
								<div>
									<DeleteMain
										id={t.id}
										edit={edit}
										dispatch={dispatch}
									/>
								</div>
								<div>
									<button
										className="edit"
										disabled={edit}
										key={nanoid()}
										onClick={() => {
											setEdit(true);
											setId(t.id);
											setInput(t.td);
											setDate(t.date);
										}}
									>
										EDIT
									</button>
								</div>

								<div>
									<AddSub
										subId={t.id}
										i={i}
									/>
								</div>
								<div>
									<select
										className="option1"
										name="select"
										value={t.select}
										disabled={t.select === 'finish'}
										onChange={(e) => {
											handleSelect(e, t.id);
										}}
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
								</div>
								<div
									className={
										t.subtodo.length > 0 && 'subtodoList'
									}
								>
									{t.subtodo.length > 0 &&
										t.subtodo.map((sb, j) => {
											return (
												<div
													style={{
														display: 'flex',
														flexDirection: 'row',
														gap: '5px',
													}}
												>
													<div>
														<input
															type="checkbox"
															checked={sb.check}
															onChange={() =>
																handleSubCheckBox(
																	t.id,
																	sb.sid,
																	sb.check,
																	i,
																)
															}
														/>
													</div>

													<div className="td">
														{sb.subtd}
													</div>
													<div>
														<button
															className="deleteSub"
															onClick={() =>
																dispatch({
																	type: 'DELETE_SUB',
																	payload: {
																		id: t.id,
																		sid: sb.sid,
																	},
																})
															}
														>
															Delete
														</button>
													</div>

													<div>
														<SubEdit
															id={t.id}
															sid={sb.sid}
															i={i}
															subtd={sb.subtd}
														/>
													</div>
													<div>
														<select
															className="option2"
															name="select"
															value={sb.select}
															disabled={
																sb.select ===
																'finish'
															}
															onChange={(e) => {
																handleSubSelect(
																	e,
																	t.id,
																	sb.sid,
																);
															}}
														>
															<option>
																select
															</option>
															{select.map(
																(f, i) => {
																	return (
																		<option
																			key={
																				f +
																				i
																			}
																			value={
																				f
																			}
																		>
																			{f}
																		</option>
																	);
																},
															)}
														</select>
													</div>
												</div>
											);
										})}
								</div>
							</div>
							<hr />
						</>
					);
				})
			) : (
				<>
					{notFound !== '' && (
						<div className="notFound">
							<p>{notFound}</p>{' '}
							<button
								onClick={() => dispatch({ type: 'NOTFOUND' })}
							>
								Ok
							</button>
						</div>
					)}
					{todo.map((t, i) => {
						return (
							<>
								<div
									className="list"
									key={nanoid()}
								>
									<div>
										<input
											type="checkbox"
											checked={t.check}
											onChange={() =>
												handleCheckBox(t.id, t.check)
											}
										/>
									</div>
									<div>{t.td}</div>
									<div>{t.date}</div>
									<div>
										<DeleteMain
											id={t.id}
											edit={edit}
											dispatch={dispatch}
										/>
									</div>
									<div>
										<button
											className="edit"
											disabled={edit}
											key={nanoid()}
											onClick={() => {
												setEdit(true);
												setId(t.id);
												setInput(t.td);
												setDate(t.date);
											}}
										>
											EDIT
										</button>
									</div>

									<div>
										<AddSub
											subId={t.id}
											i={i}
										/>
									</div>
									<div>
										<select
											className="option1"
											name="select"
											value={t.select}
											disabled={t.select === 'finish'}
											onChange={(e) => {
												handleSelect(e, t.id);
											}}
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
									</div>
									<div
										className={
											t.subtodo.length > 0 &&
											'subtodoList'
										}
									>
										{t.subtodo.length > 0 &&
											t.subtodo.map((sb, j) => {
												return (
													<div
														style={{
															display: 'flex',
															flexDirection:
																'row',
															gap: '5px',
														}}
													>
														<div>
															<input
																checked={
																	sb.check
																}
																type="checkbox"
																onChange={() =>
																	handleSubCheckBox(
																		sb.sid,
																		sb.check,
																		i,
																	)
																}
															/>
														</div>

														<div className="td">
															{sb.subtd}
														</div>
														<div>
															<button
																className="deleteSub"
																onClick={() =>
																	dispatch({
																		type: 'DELETE_SUB',
																		payload:
																			{
																				id: t.id,
																				sid: sb.sid,
																			},
																	})
																}
															>
																Delete
															</button>
														</div>

														<div>
															<SubEdit
																sid={sb.sid}
																i={i}
																subtd={sb.subtd}
															/>
														</div>
														<div>
															<select
																className="option2"
																name="select"
																value={
																	sb.select
																}
																disabled={
																	sb.select ===
																	'finish'
																}
																onChange={(
																	e,
																) => {
																	handleSubSelect(
																		e,
																		t.id,
																		sb.sid,
																	);
																}}
															>
																<option>
																	select
																</option>
																{select.map(
																	(f, i) => {
																		return (
																			<option
																				key={
																					f +
																					i
																				}
																				value={
																					f
																				}
																			>
																				{
																					f
																				}
																			</option>
																		);
																	},
																)}
															</select>
														</div>
													</div>
												);
											})}
									</div>
								</div>
								<hr />
							</>
						);
					})}
				</>
			)}
		</div>
	);
};

export default List;
