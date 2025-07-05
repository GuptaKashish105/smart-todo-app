import React from "react";
import TaskCard from "./TaskCard";

export default function TaskBuckets({
  title,
  tasks,
  onEdit,
  onDelete,
  onToggle,
  onHistoryMove,
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="space-y-2">
        {tasks?.length > 0 ? (
          tasks?.map((task) => (
            <TaskCard
              key={task?.id}
              task={task}
              onEdit={() => onEdit(task)}
              onDelete={() => onDelete(task?.id)}
              onToggle={() => onToggle(task?.id)}
              onHistoryMove={() => onHistoryMove(task?.id)}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 italic text-center">
            No tasks found
          </p>
        )}
      </div>
    </div>
  );
}
