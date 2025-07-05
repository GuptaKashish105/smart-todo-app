import React from "react";

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggle,
  onHistoryMove,
}) {
  const now = new Date();
  const deadline = new Date(task?.deadline);
  const isOverdue = !task?.isCompleted && deadline < now;

  const timeDiff = Math.abs(deadline - now);
  const hours = Math.floor(timeDiff / 3600000);
  const mins = Math.floor((timeDiff % 3600000) / 60000);
  const status = task?.isCompleted
    ? "Completed"
    : isOverdue
    ? `Overdue by ${hours}h ${mins}m`
    : `Due in ${hours}h ${mins}m`;

  const bgColor = task?.isCompleted
    ? "bg-green-100"
    : isOverdue
    ? "bg-red-100"
    : "bg-yellow-100";

  return (
    <div
      className={`relative group p-4 rounded-lg border-l-4 shadow-lg transition-all duration-300 hover:scale-[1.02] ${bgColor}`}
    >
      <div className="absolute -top-2 -left-2 w-4 h-4 bg-white rounded-full border-2 border-gray-300 group-hover:bg-yellow-300 transition" />

      <h3 className="text-lg font-semibold text-gray-800">{task?.title}</h3>
      {task?.description && (
        <p className="text-sm text-gray-700">{task?.description}</p>
      )}
      <p className="text-xs italic text-gray-600 mt-1">{status}</p>

      <div className="flex justify-end gap-3 mt-3">
        <button
          onClick={onToggle}
          title="Mark Complete"
          className="hover:text-green-700 transition"
          aria-label="Mark complete"
        >
          ✅
        </button>
        <button
          onClick={onEdit}
          title="Edit Task"
          className="hover:text-blue-700 transition"
          aria-label="Edit task"
        >
          ✏️
        </button>
        <button
          onClick={onHistoryMove}
          title="Move to History"
          className="hover:text-gray-700 transition"
          aria-label="Move to history"
        >
          🔄
        </button>
        <button
          onClick={onDelete}
          title="Delete Task"
          className="hover:text-red-700 transition"
          aria-label="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
