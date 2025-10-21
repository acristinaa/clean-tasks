"use client";

import { useMemo, useState } from "react";
import type { Task, Filter } from "./lib/types";

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [error, setError] = useState<string | null>(null);

  function addTask() {
    if (!title.trim()) {
      setError("Title cannot be empty");
      return;
    }
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
    setTitle("");
    setError(null);
  }

  function toggle(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const visibleTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return tasks.filter((t) => !t.completed);
      case "completed":
        return tasks.filter((t) => t.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  return (
    <main style={{ maxWidth: 560, margin: "2rem auto", padding: 16 }}>
      <h1>Clean Tasks</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
        style={{ display: "flex", gap: 8 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task…"
          aria-label="Task title"
        />
        <button type="submit">Add</button>
      </form>

      {error && (
        <p role="alert" style={{ color: "crimson" }}>
          {error}
        </p>
      )}

      <div style={{ marginTop: 12 }}>
        <button onClick={() => setFilter("all")} disabled={filter === "all"}>
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          disabled={filter === "active"}>
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          disabled={filter === "completed"}>
          Completed
        </button>
      </div>

      <ul style={{ marginTop: 16 }}>
        {visibleTasks.map((task) => (
          <li
            key={task.id}
            style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggle(task.id)}
              aria-label={`Toggle ${task.title}`}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}>
              {task.title}
            </span>
            <button
              onClick={() => removeTask(task.id)}
              aria-label={`Delete ${task.title}`}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
