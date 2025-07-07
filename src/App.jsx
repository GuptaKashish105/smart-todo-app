import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskBuckets from "./components/TaskBuckets";
import { fetchTasks, createTask, updateTask, deleteTask } from "./api/tasks";
import { FaFileDownload, FaGithub, FaLinkedin } from "react-icons/fa";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loadTasks = async () => {
    setLoading(true);
    const allTasks = await fetchTasks();
    const normalized = allTasks.map((task) => ({
      ...task,
      id: task._id,
    }));
    setTasks(normalized);
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
    const interval = setInterval(() => loadTasks(), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCreate = async (task) => {
    await createTask({
      ...task,
      isCompleted: false,
      deadline: new Date(task?.deadline)?.toISOString(),
    });
    loadTasks();
  };

  // ✅ Update task (edit title, desc, etc.)
  const handleUpdate = async (task) => {
    await updateTask(task?.id, {
      ...task,
      deadline: new Date(task?.deadline)?.toISOString(),
    });
    setEditingTask(null);
    loadTasks();
  };

  // ✅ Mark task as "failed" by setting deadline to past
  const handleMoveToHistory = async (id) => {
    const task = tasks?.find((t) => t?.id === id);
    if (!task) return;

    const past = new Date(Date.now() - 60 * 1000)?.toISOString();

    await updateTask(id, {
      title: task.title,
      description: task.description,
      isCompleted: false,
      deadline: past,
    });

    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  // ✅ Toggle isCompleted status
  const handleComplete = async (id) => {
    const task = tasks?.find((t) => t?.id === id);
    if (!task) return;

    await updateTask(id, {
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      isCompleted: !task?.isCompleted,
    });

    loadTasks();
  };

  // ✅ Smart bucketing
  const now = new Date();

  const filterBySearch = (list) =>
    list.filter((t) =>
      t?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
    );

  const ongoing = filterBySearch(
    tasks?.filter((t) => !t?.isCompleted && new Date(t?.deadline) > now)
  );

  const success = filterBySearch(tasks?.filter((t) => t?.isCompleted));

  const failure = filterBySearch(
    tasks?.filter((t) => !t?.isCompleted && new Date(t?.deadline) <= now)
  );

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow-md py-4 px-6 flex items-center justify-between mb-0">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🚀</span>
          <h2 className="text-xl font-semibold text-blue-800">
            Kashish TaskHub
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/GuptaKashish105"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:underline"
          >
            <FaGithub className="text-xl" />
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/kashishgupta142/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:underline"
          >
            <FaLinkedin className="text-xl" />
            Linkedin ↗
          </a>
          <a
            href="/Kashish's Resume.pdf"
            download
            className="flex items-center gap-2 text-sm hover:underline"
          >
            <FaFileDownload className="text-xl" />
            Resume 🗂️
          </a>
        </div>
      </header>

      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-10 px-4">
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-6 max-w-6xl mx-auto animate-in fade-in zoom-in duration-500">
          <h1 className="text-4xl font-bold text-center mb-6 text-blue-800 drop-shadow">
            🧠 Smart Todo
          </h1>

          {/* 🔍 Search bar */}
          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-md">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* 📝 Task Form */}
          <TaskForm
            onSubmit={editingTask ? handleUpdate : handleCreate}
            task={editingTask}
            onCancel={() => setEditingTask(null)}
          />

          {/* 📦 Buckets */}
          {loading ? (
            <p className="text-center text-gray-600 mt-6">Loading tasks...</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <TaskBuckets
                title="Ongoing"
                tasks={ongoing}
                onEdit={setEditingTask}
                onHistoryMove={handleMoveToHistory}
                onToggle={handleComplete}
                onDelete={handleDelete}
              />
              <TaskBuckets
                title="Success"
                tasks={success}
                onEdit={setEditingTask}
                onHistoryMove={handleMoveToHistory}
                onToggle={handleComplete}
                onDelete={handleDelete}
              />
              <TaskBuckets
                title="Task Added / History"
                tasks={failure}
                onEdit={setEditingTask}
                onHistoryMove={handleMoveToHistory}
                onToggle={handleComplete}
                onDelete={handleDelete}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
