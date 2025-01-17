import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import styles from "./styles.module.css";

interface Task {
  id: number;
  title: string;
  isDone: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const response = await fetch(
        "https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos"
      );

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao recuperar as tarefas:", error);
    }
  }

  function addTask() {
    if (newTaskTitle === "") return;

    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      isDone: false,
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
  }

  function removeTask(taskId: number) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  function toggleTask(taskId: number) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isDone: !task.isDone } : task
      )
    );
  }

  function toggleAllTasks() {
    const allIsDone = tasks.every((task) => task.isDone);

    const updatedTasks = tasks.map((task) => ({
      ...task,
      isDone: !allIsDone,
    }));
    setTasks(updatedTasks);
  }

  function countTasks() {
    return tasks.filter((task) => !task.isDone).length;
  }

  function handleDoubleClick(taskId: number, title: string) {
    setEditingTaskId(taskId);
    setEditingTaskTitle(title);
  }

  function handleEditChange(element: React.ChangeEvent<HTMLInputElement>) {
    setEditingTaskTitle(element.target.value);
  }

  function handleEditKeyboard(
    element: React.KeyboardEvent<HTMLInputElement>,
    taskId: number
  ) {
    if (element.key === "Enter") {
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, title: editingTaskTitle } : task
        )
      );
      setEditingTaskId(null);
    }
  }

  function clearCompleted() {
    setTasks(tasks.filter((task) => !task.isDone));
  }

  function changeFilter(selectedFilter: string) {
    setFilter(selectedFilter);
  }

  return (
    <Router>
      <section className={styles.containerSection}>
        <h1>todos</h1>

        <div>
          <div className={styles.containerCheckbox}>
            <input
              className={styles.checkbox}
              type="checkbox"
              onClick={toggleAllTasks}
            />
            {tasks.length !== 0 && <label onClick={toggleAllTasks}></label>}
          </div>

          <div>
            <input
              className={styles.input}
              type="text"
              placeholder="What needs to be done?"
              value={newTaskTitle}
              onChange={(event) => setNewTaskTitle(event.target.value)}
              onKeyDown={(element) => element.key === "Enter" && addTask()}
            />
          </div>
        </div>

        <main className={styles.main}>
          <ul className={styles.todoList}>
            {tasks
              .filter((task) => {
                if (filter === "active") {
                  return !task.isDone;
                } else if (filter === "completed") {
                  return task.isDone;
                } else {
                  return task;
                }
              })
              .map((task) => (
                <li
                  key={task.id}
                  className={task.isDone ? styles.completed : ""}
                >
                  <div className={styles.view}>
                    <input
                      className={styles.toggle}
                      type="checkbox"
                      onChange={() => toggleTask(task.id)}
                      checked={task.isDone}
                    />

                    {editingTaskId === task.id ? (
                      <input
                        className={styles.edit}
                        type="text"
                        value={editingTaskTitle}
                        onChange={handleEditChange}
                        onBlur={() => setEditingTaskId(null)}
                        onKeyDown={(element) =>
                          handleEditKeyboard(element, task.id)
                        }
                      />
                    ) : (
                      <label
                        onDoubleClick={() =>
                          handleDoubleClick(task.id, task.title)
                        }
                      >
                        {task.title}
                      </label>
                    )}

                    <button
                      className={styles.destroy}
                      onClick={() => removeTask(task.id)}
                    ></button>
                  </div>
                </li>
              ))}
          </ul>
        </main>

        {tasks.length !== 0 && (
          <footer className={styles.footer}>
            <span className={styles.todoCount}>{countTasks()} items left!</span>
            <ul className={styles.filters}>
              <li>
                <Link
                  to="/"
                  className={filter === "all" ? styles.selected : ""}
                  onClick={() => changeFilter("all")}
                >
                  All
                </Link>
              </li>
              <li>
                <Link
                  to="/active"
                  className={filter === "active" ? styles.selected : ""}
                  onClick={() => changeFilter("active")}
                >
                  Active
                </Link>
              </li>
              <li>
                <Link
                  to="/completed"
                  className={filter === "completed" ? styles.selected : ""}
                  onClick={() => changeFilter("completed")}
                >
                  Completed
                </Link>
              </li>
            </ul>
            <button
              className={styles.clearCompleted}
              onClick={() => clearCompleted()}
            >
              Clear completed
            </button>
          </footer>
        )}
      </section>

      <div className={styles.info}>
        <p>Double-click to edit a todo</p>
        <p>Created by the TodoMVC Team</p>
        <p>Part of TodoMVC</p>
      </div>
    </Router>
  );
}
