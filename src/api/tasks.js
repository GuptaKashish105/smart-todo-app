const API_URL = "/api/tasks";

export const fetchTasks = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

export const createTask = async (task) => {
  const payload = {
    ...task,
    isCompleted: false,
    createdAt: new Date()?.toISOString(),
    updatedAt: new Date()?.toISOString(),
  };
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await res.json();
};

export const updateTask = async (id, updates) => {
  const { id: _removedId, _id, ...safeUpdates } = updates;

  const res = await fetch("/api/tasks", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      ...safeUpdates,
      updatedAt: new Date().toISOString(),
    }),
  });

  return await res.json();
};

export const deleteTask = async (_id) => {
  await fetch(`/api/tasks?id=${_id}`, {
    method: "DELETE",
  });
};
