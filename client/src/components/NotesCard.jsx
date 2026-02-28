import React, { useState, useEffect } from "react";

const NotesCard = () => {
  const [note, setNote] = useState("");

  useEffect(() => {
    const savedNote = localStorage.getItem("finance_note");
    if (savedNote) setNote(savedNote);
  }, []);

  useEffect(() => {
    localStorage.setItem("finance_note", note);
  }, [note]);

  return (
    <div className="card notes-card">
      <div className="card-title">Notes</div>
      <div className="notes-content"></div>
      <textarea
        className="sticky-note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your financial notes..."
      />
    </div>
  );
};

export default NotesCard;