import React from "react";
import styles from "./styles.module.css";

export default function App() {
  return (
    <section className={styles.containerSection}>
      <h1>todos</h1>

      <div className={styles.containerSearch}>
        <div className={styles.containerCheckbox}>
          <input className={styles.checkbox} type="checkbox" name="checkbox" />
          <label htmlFor="checkbox">Toggle All Input</label>
        </div>

        <div className={styles.containerInput}>
          <input
            className={styles.input}
            type="text"
            placeholder="What needs to be done?"
          />
        </div>
      </div>

      <main className={styles.main}>
        <ul className={styles.todoList}>
          <li>
            <div className={styles.view}>
              <input className={styles.toggle} type="checkbox" />
              <label>123</label>
              <button className={styles.destroy}></button>
            </div>
          </li>
          <li>
            <div className={styles.view}>
              <input className={styles.toggle} type="checkbox" />
              <label>45683</label>
              <button className={styles.destroy} />
            </div>
          </li>
        </ul>
      </main>

      <footer className={styles.footer}>
        <span className={styles.todoCount}>2 items left!</span>
        <ul className={styles.filters}>
          <li>
            <a href="#">All</a>
          </li>
          <li>
            <a href="#">Active</a>
          </li>
          <li>
            <a href="#">Active</a>
          </li>
        </ul>
        <button className={styles.clearCompleted}>Clear completed</button>
      </footer>
    </section>
  );
}
