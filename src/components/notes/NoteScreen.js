import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNote, startDeleting } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
	const dispatch = useDispatch();
	const { active: note } = useSelector((state) => state.notes);
	const [formValues, handleInputChange, reset] = useForm(note);
	const { body, title, id } = formValues;
	const activeId = useRef(note.id);
	useEffect(() => {
		if (activeId.current !== note.id) {
			reset(note);
			activeId.current = note.id;
		}
	}, [reset, note]);
	useEffect(() => {
		dispatch(activeNote(formValues.id, { ...formValues }));
	}, [formValues, dispatch]);
	const handleClick = () => {
		dispatch(startDeleting(id));
	};
	return (
		<div className="notes__main-content">
			<NotesAppBar />
			<div className="notes__content">
				<form>
					<input
						className="notes__tittle-input"
						type="text"
						autoComplete="off"
						placeholder="Some awesome tittle"
						name="title"
						value={title}
						onChange={handleInputChange}
					/>
					<textarea
						className="notes__textarea"
						placeholder="What happened today?"
						name="body"
						value={body}
						onChange={handleInputChange}
					></textarea>
					{note.url && (
						<div className="notes__image">
							<img src={note.url} alt="imagen" />
						</div>
					)}
				</form>
			</div>
			<button className="btn btn-danger" onClick={handleClick}>
				Delete
			</button>
		</div>
	);
};
