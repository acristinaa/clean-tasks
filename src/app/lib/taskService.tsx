import type { Task, Filter } from "./types";

export function createTask(title: string, now = Date.now): Task {
  const t = title.trim();
  if (!t) throw new Error("Title cannot be empty");
  return {
    id: crypto.randomUUID(),
    title: t,
    completed: false,
    createdAt: now(),
  };
}

export function addTask(tasks: Task[], title: string, now = Date.now): Task[] {
  return [createTask(title, now), ...tasks];
}

export function toggleTaskCompletion(tasks: Task[], id: string): Task[] {
  return tasks.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
}

export function deleteTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((t) => t.id !== id);
}

export function getVisibleTasks(tasks: Task[], filter: Filter): Task[] {
  switch (filter) {
    case "active":
      return tasks.filter((t) => !t.completed);
    case "completed":
      return tasks.filter((t) => t.completed);
    default:
      return tasks;
  }
}
