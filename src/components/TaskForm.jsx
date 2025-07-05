import React, { useState, useEffect } from "react";

export default function TaskForm({ onSubmit, task, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task?.title);
      setDescription(task?.description);
      setDeadline(task?.deadline?.slice(0, 16));
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !deadline) return;
    const payload = {
      ...task,
      title,
      description,
      deadline: new Date(deadline)?.toISOString(),
    };
    onSubmit(payload);
    setTitle("");
    setDescription("");
    setDeadline("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md p-4 rounded space-y-3"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description (optional)"
        className="w-full border p-2 rounded"
      />
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        min={new Date().toISOString().slice(0, 16)} // prevents past deadlines
        required
        className="w-full border p-2 rounded"
      />

      <div className="flex gap-2 items-center justify-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {task ? "Update Task" : "Add Task"}
        </button>
        {task && (
          <button type="button" onClick={onCancel} className="text-red-500">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
