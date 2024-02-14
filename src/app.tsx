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

    setTasks([...tasks, newTask]);
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
  console.log(tasks);

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
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
        </div>
      </div>

      <main className={styles.main}>
        <ul className={styles.todoList}>
          {tasks.map((task) => (
            <li key={task.id}>
              <div className={styles.view}>
                <input
                  className={styles.toggle}
                  type="checkbox"
                  onClick={() => toggleTaskCompletion(task.id)}
                  checked={task.isDone}
                />

                <label>{task.title}</label>
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
        <button className={styles.clearCompleted}>Clear completed</button>
      </footer>
    </section>
  );
}
