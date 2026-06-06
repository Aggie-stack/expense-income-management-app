import React, { useState, useEffect } from "react";

const NotesCard = () => {
  const [note, setNote] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("finance_note");
      if (saved) setNote(saved);
    } catch (e) {}
  }, []);

  const handleChange = (e) => {
    setNote(e.target.value);
    try {
      localStorage.setItem("finance_note", e.target.value);
    } catch (e) {}
  };

  return (
    <div className="notes-card">
      <div className="notes-card-header">
        <span className="notes-card-title">📝 Notes</span>
        <span className="notes-autosave-hint">Auto-saved</span>
      </div>
      <textarea
        className="notes-textarea"
        value={note}
        onChange={handleChange}
        placeholder="Jot down your financial goals, reminders, or notes..."
      />
    </div>
  );
};

export default NotesCard;