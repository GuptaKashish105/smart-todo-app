const API_URL = "http://localhost:3001/tasks";

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
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...updates,
      updatedAt: new Date()?.toISOString(),
    }),
  });
  return await res.json();
};

export const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
