import styles from "./SearchBar.module.css";

/**
 * @param {{
 *   value: string,
 *   onChange: (value: string) => void,
 *   onSubmit?: (value: string) => void
 * }} props
 */
function SearchBar({ value, onChange, onSubmit }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon} aria-hidden="true">
        🔍
      </span>
      <input
        type="text"
        className={styles.input}
        placeholder="Rechercher une ville (ex: Tokyo, JP) puis Entrée"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onSubmit) onSubmit(value);
        }}
      />
      {value && (
        <button
          type="button"
          className={styles.clear}
          onClick={() => onChange("")}
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
