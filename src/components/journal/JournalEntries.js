import React from "react";
import { useSelector } from "react-redux";
import { JournalEntry } from "./JournalEntry";

export const JournalEntries = () => {
	const { notes } = useSelector((state) => state.notes);
	return (
		<>
			{notes.length === 0 ? (
				<div className="mt-5 journal__no-entries">
					Create some entries!!
				</div>
			) : (
				<div className="journal__entries">
					{notes.map((note) => (
						<JournalEntry key={note.id} {...note} />
					))}
				</div>
			)}
		</>
	);
};
