"use client";

import { useMemo, useState} from "react";
import type { Task, Filter } from "./lib/types";

export default function Page(){
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [error, setError] =  useState<string | null>(null);

  function addTask(){
    if (!title.trim()) { setError("Title cannot be empty"); return;}
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    setTasks(prev => [newTask, ...prev]);
    setTitle("");
    setError(null);
  }

  function toggle(id: string) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  function removeTask(id: string) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  const visibleTasks = useMemo(() => {
    switch(filter){
      case "active": return tasks.filter(t => !t.completed);
      case "completed": return tasks.filter(t => t.completed);
      default: return tasks;
    }
  }, [tasks, filter]);

  return 
  (
    <main style={{ maxWidth: 560, margin: "2rem auto", padding: 16}}>
      <h1>Clean Tasks</h1>
    </main>
  )

}