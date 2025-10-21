import { test, expect } from "vitest";

import {
  addTask,
  toggleTaskCompletion,
  deleteTask,
  getVisibleTasks,
} from "../src/app/lib/taskService";
import type { Task } from "../src/app/lib/types";

// deterministic time
const fakeNow = () => 1700000000000;

function make(id: string, title = "t"): Task {
  return { id, title, completed: false, createdAt: 1 };
}

test("addTask trims and prepends", () => {
  const res = addTask([], "  Learn Clean Code  ", fakeNow);
  expect(res).toHaveLength(1);
  expect(res[0].title).toBe("Learn Clean Code");
  expect(res[0].createdAt).toBe(fakeNow());
});

test("toggleTaskCompletion flips by id", () => {
  const tasks = [make("1"), make("2")];
  const res = toggleTaskCompletion(tasks, "2");
  expect(res.find((t) => t.id === "2")?.completed).toBe(true);
  // immutability
  expect(tasks[1].completed).toBe(false);
});

test("deleteTask removes by id", () => {
  const tasks = [make("1"), make("2")];
  const res = deleteTask(tasks, "1");
  expect(res).toHaveLength(1);
  expect(res[0].id).toBe("2");
});

test("getVisibleTasks filters correctly", () => {
  const tasks = [
    { ...make("1"), completed: false },
    { ...make("2"), completed: true },
  ];
  expect(getVisibleTasks(tasks, "all")).toHaveLength(2);
  expect(getVisibleTasks(tasks, "active")).toHaveLength(1);
  expect(getVisibleTasks(tasks, "completed")).toHaveLength(1);
});
