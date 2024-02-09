import React from "react";
import styles from "./styles.module.css";

export default function App() {
  return (
    <section className={styles.containerSection}>
      <h1>todos</h1>


      <div className={styles.containerInput}>
        <input
          className={styles.input}
          type="text"
          placeholder="What needs to be done?"
        />
      </div>
    </section>
  );
}
