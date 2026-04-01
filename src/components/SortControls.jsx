import styles from "./SortControls.module.css";

function SortControls({ sortType, setSortType, targetTemp, setTargetTemp }) {
  const toggle = (type) => setSortType(sortType === type ? null : type);

  return (
    <div className={styles.controls}>
      <button
        className={`${styles.btn} ${sortType === "asc" ? styles.active : ""}`}
        onClick={() => toggle("asc")}
      >
        🌡️ Croissant
      </button>
      <button
        className={`${styles.btn} ${sortType === "desc" ? styles.active : ""}`}
        onClick={() => toggle("desc")}
      >
        🌡️ Décroissant
      </button>
      <div className={styles.proximity}>
        <button
          className={`${styles.btn} ${sortType === "proximity" ? styles.active : ""}`}
          onClick={() => toggle("proximity")}
        >
          🎯 Proximité
        </button>
        <div className={styles.targetInput}>
          <input
            type="number"
            value={targetTemp}
            onChange={(e) => setTargetTemp(Number(e.target.value))}
            className={styles.input}
          />
          <span className={styles.unit}>°C</span>
        </div>
      </div>
    </div>
  );
}

export default SortControls;
