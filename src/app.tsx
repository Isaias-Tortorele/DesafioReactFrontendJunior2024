import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        "https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos"
      );

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao recuperar as tarefas:", error);
    }
  };

  const addTask = () => {
    if (newTaskTitle === "") return;

    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      isDone: false,
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
  };

  const removeTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const toggleAllTasksCompletion = () => {
    const allisDone = tasks.every((task) => task.isDone);
    const updatedTasks = tasks.map((task) => ({
      ...task,
      isDone: !allisDone,
    }));
    setTasks(updatedTasks);
  };

  const handleDoubleClick = (taskId: number, title: string) => {
    setEditingTaskId(taskId);
    setEditingTaskTitle(title);
  };

  const handleEditChange = (element: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTaskTitle(element.target.value);
  };

  const handleEditKeyDown = (
    element: React.KeyboardEvent<HTMLInputElement>,
    taskId: number
  ) => {
    if (element.key === "Enter") {
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, title: editingTaskTitle } : task
        )
      );
      setEditingTaskId(null);
    }
  };

  const clearCompleted = () => {
    setTasks([]);
  };

  return (
    <section className={styles.containerSection}>
      <h1>todos</h1>

      <div className={styles.containerSearch}>
        <div className={styles.containerCheckbox}>
          <input
            className={styles.checkbox}
            type="checkbox"
            onClick={toggleAllTasksCompletion}
          />
          <label></label>
        </div>

        <div className={styles.containerInput}>
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
          {tasks.map((task) => (
            <li key={task.id} className={task.isDone ? styles.completed : ""}>
              <div className={styles.view}>
                <input
                  className={styles.toggle}
                  type="checkbox"
                  onClick={() => toggleTaskCompletion(task.id)}
                  checked={task.isDone}
                />

                {editingTaskId === task.id ? (
                  <input
                    className={styles.edit}
                    type="text"
                    value={editingTaskTitle}
                    onChange={handleEditChange}
                    onBlur={() => setEditingTaskId(null)}
                    onKeyDown={(element) => handleEditKeyDown(element, task.id)}
                  />
                ) : (
                  <label
                    onDoubleClick={() => handleDoubleClick(task.id, task.title)}
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

      <footer className={styles.footer}>
        <span className={styles.todoCount}>{tasks.length} items left!</span>
        <ul className={styles.filters}>
          <li>
            <a href="#">All</a>
          </li>
          <li>
            <a href="#">Active</a>
          </li>
          <li>
            <a href="#">Completed</a>
          </li>
        </ul>
        <button
          className={styles.clearCompleted}
          onClick={() => clearCompleted()}
        >
          Clear completed
        </button>
      </footer>
    </section>
  );
}
